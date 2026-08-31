Absolutely. What you're describing is essentially a **JSON-driven information architecture + React router/view renderer**. The key is to keep the JSON concerned with **content and relationships**, while React handles **how a page is rendered and navigated**.

I'd structure it so you can support both:

1. **Hierarchical navigation** — Home → Persona → Journey → Task → Resource
2. **Cross-links** — a resource can be reached from several different paths without duplicating it in the JSON.

### 1. A schema I'd recommend

Rather than nesting the entire site inside `children` arrays, I'd use **IDs + references**. You _can_ have children arrays, but references make the system dramatically easier to maintain once pages start appearing in multiple journeys.

For example:

```json
{
  "site": {
    "title": "Welcome",
    "home": "home"
  },

  "pages": {
    "home": {
      "id": "home",
      "type": "home",
      "title": "How can we help?",
      "intro": "Choose the option that best describes your situation.",
      "children": ["refugee", "asylum-seeker", "disaster", "country"]
    },

    "refugee": {
      "id": "refugee",
      "type": "persona",
      "title": "I am a refugee",
      "children": ["refugee-arrival", "refugee-housing", "refugee-work"]
    },

    "asylum-seeker": {
      "id": "asylum-seeker",
      "type": "persona",
      "title": "I am an asylum seeker",
      "children": ["asylum-application", "asylum-housing", "asylum-support"]
    },

    "disaster": {
      "id": "disaster",
      "type": "persona",
      "title": "I am fleeing a disaster",
      "children": [
        "emergency-arrival",
        "emergency-housing",
        "emergency-support"
      ]
    },

    "country": {
      "id": "country",
      "type": "country-selector",
      "title": "I am from a specific country",
      "children": ["country-ukraine", "country-syria"]
    },

    "refugee-arrival": {
      "id": "refugee-arrival",
      "type": "journey",
      "title": "I've just arrived",
      "children": ["refugee-documents", "refugee-housing"]
    },

    "refugee-housing": {
      "id": "refugee-housing",
      "type": "task",
      "title": "Find somewhere to live",
      "children": ["housing-resources"]
    },

    "refugee-work": {
      "id": "refugee-work",
      "type": "task",
      "title": "Find work",
      "children": ["work-resources"]
    },

    "housing-resources": {
      "id": "housing-resources",
      "type": "resource-list",
      "title": "Housing resources",
      "resources": [
        {
          "title": "Finding emergency accommodation",
          "url": "https://example.org/housing"
        },
        {
          "title": "Local housing support",
          "url": "https://example.org/support"
        }
      ]
    },

    "work-resources": {
      "id": "work-resources",
      "type": "resource-list",
      "title": "Work resources",
      "resources": [
        {
          "title": "Finding employment",
          "url": "https://example.org/work"
        }
      ]
    }
  }
}
```

The important bit is that the `children` values are **IDs**, rather than complete objects.

That means you can have:

```text
Refugee
   └── Housing
          └── Housing resources

Asylum seeker
   └── Housing
          └── Housing resources

Person fleeing disaster
   └── Housing
          └── Housing resources
```

without having three copies of your housing resources.

---

## 2. Think of your JSON as a graph

This is probably the most useful conceptual shift.

Your sitemap isn't necessarily a tree.

It's a **directed graph**.

For example:

```text
                         HOME
                    /      |       \
                   /       |        \
              REFUGEE   ASYLUM     DISASTER
                 |         |           |
                 v         v           v
              HOUSING   HOUSING     HOUSING
                   \       |         /
                    \      |        /
                     v     v       v
                     HOUSING RESOURCES
```

That's a really good fit for the type of site you're describing.

A pure nested JSON structure becomes awkward because you'd eventually end up doing this:

```json
{
  "refugee": {
    "children": {
      "housing": {
        "children": {
          "resources": {}
        }
      }
    }
  }
}
```

and then separately:

```json
{
  "asylumSeeker": {
    "children": {
      "housing": {
        "children": {
          "resources": {}
        }
      }
    }
  }
}
```

Now you've duplicated content.

IDs solve that.

---

# 3. Add navigation metadata

I'd actually make the schema slightly richer.

Something like:

```json
{
  "id": "refugee-housing",
  "type": "task",
  "title": "Find somewhere to live",
  "description": "Information about finding accommodation.",
  "children": ["housing-resources"],
  "navigation": {
    "back": true,
    "home": true
  }
}
```

And potentially:

```json
{
  "id": "refugee",
  "type": "persona",
  "title": "I am a refugee",
  "description": "Find information and support for refugees.",
  "children": ["refugee-arrival", "refugee-housing", "refugee-work"]
}
```

This gives you the ability to make React completely generic.

---

# 4. React doesn't actually need to know your sitemap

This is the really nice part.

You can make a generic `Page` component:

```tsx
type Page = {
  id: string;
  type: string;
  title: string;
  description?: string;
  children?: string[];
  resources?: Resource[];
};

type Resource = {
  title: string;
  url: string;
};
```

Then load your JSON:

```tsx
import sitemap from "./sitemap.json";
```

And your application state can simply be:

```tsx
const [currentPage, setCurrentPage] = useState("home");
```

Then:

```tsx
const page = sitemap.pages[currentPage];
```

That's basically your entire navigation engine.

---

# 5. The renderer

I'd create something like:

```tsx
function App() {
  const [currentPage, setCurrentPage] = useState(sitemap.site.home);

  const page = sitemap.pages[currentPage];

  return <SitePage page={page} onNavigate={setCurrentPage} />;
}
```

And:

```tsx
function SitePage({
  page,
  onNavigate,
}: {
  page: Page;
  onNavigate: (id: string) => void;
}) {
  return (
    <main>
      <h1>{page.title}</h1>

      {page.description && <p>{page.description}</p>}

      <nav>
        {page.children?.map((childId) => {
          const child = sitemap.pages[childId];

          return (
            <button key={child.id} onClick={() => onNavigate(child.id)}>
              {child.title}
            </button>
          );
        })}
      </nav>
    </main>
  );
}
```

And that's already enough to prove the concept.

---

# 6. But I'd make page types configurable

Because your home page isn't necessarily going to look like a resource page.

I'd have:

```text
home
persona
country-selector
journey
task
resource-list
article
```

Then:

```tsx
function PageRenderer({ page, onNavigate }: Props) {
  switch (page.type) {
    case "home":
      return <HomePage page={page} onNavigate={onNavigate} />;

    case "persona":
      return <PersonaPage page={page} onNavigate={onNavigate} />;

    case "country-selector":
      return <CountryPage page={page} onNavigate={onNavigate} />;

    case "resource-list":
      return <ResourcePage page={page} />;

    default:
      return <StandardPage page={page} onNavigate={onNavigate} />;
  }
}
```

Now your **content remains JSON**, while the React components define the visual treatment.

---

# 7. One page at a time

The requirement you've described:

> "only one layer rendered at a time"

is actually very easy with this architecture.

Don't recursively render children.

**Render the current page only.**

So if you're here:

```text
Home
 ↓
Refugee
 ↓
Housing
 ↓
Resources
```

React only renders:

```text
Resources
```

at that point.

The `children` array simply tells the current page what navigation options are available.

That's an important distinction.

You **don't** want:

```tsx
<Page>
  <Page>
    <Page>
      <Page />
    </Page>
  </Page>
</Page>
```

You want:

```tsx
<Page />
```

where the identity of `<Page />` changes.

---

# 8. I'd use URLs rather than only React state

There's one change I'd make to the simple example above.

Don't ultimately rely on:

```tsx
useState("home");
```

because then refreshing the browser loses the current page.

Instead, I'd give every page a URL:

```text
/
 /refugee
 /refugee/arrival
 /refugee/housing
 /resources/housing
```

You can use **React Router** for this.

Then your JSON could contain:

```json
{
  "id": "refugee-housing",
  "path": "/refugee/housing",
  "type": "task",
  "title": "Find somewhere to live",
  "children": ["housing-resources"]
}
```

Although there's an even better option: **generate the route from the page ID**.

For example:

```text
/page/refugee-housing
```

Then you don't have to maintain two identifiers.

---

# 9. A nice architecture for the project

I'd probably build the project like this:

```text
src/
│
├── data/
│   └── sitemap.json
│
├── components/
│   ├── SiteHeader.tsx
│   ├── Breadcrumbs.tsx
│   ├── PageNavigation.tsx
│   ├── PageCard.tsx
│   └── ResourceList.tsx
│
├── pages/
│   ├── HomePage.tsx
│   ├── PersonaPage.tsx
│   ├── JourneyPage.tsx
│   ├── TaskPage.tsx
│   └── ResourcePage.tsx
│
├── types/
│   └── sitemap.ts
│
├── App.tsx
└── main.tsx
```

The really important separation is:

```text
sitemap.json
     ↓
   content
     ↓
React page renderer
     ↓
visual presentation
```

---

# 10. I'd also add breadcrumbs

For the sort of journey you're describing, breadcrumbs become extremely useful:

```text
Home
  › I am a refugee
      › Find somewhere to live
          › Housing resources
```

You can actually derive those from the JSON rather than storing them.

For that, I'd add a `parents` relationship or calculate it by searching the graph.

For example:

```tsx
function findParent(pageId: string) {
  return Object.values(sitemap.pages).find((page) =>
    page.children?.includes(pageId),
  );
}
```

For a more complicated graph, I'd build a proper navigation helper.

---

# 11. One other thing I'd strongly recommend

Separate **navigation nodes** from **content**.

For example, don't make this:

```json
{
  "title": "Find housing",
  "children": [
    {
      "title": "Housing resource 1",
      "url": "..."
    }
  ]
}
```

Instead:

```json
{
  "id": "housing",
  "type": "task",
  "title": "Find housing",
  "children": ["housing-resources"]
}
```

and:

```json
{
  "id": "housing-resources",
  "type": "resource-list",
  "title": "Housing resources",
  "resources": [
    {
      "id": "resource-1",
      "title": "Finding accommodation",
      "description": "Information about...",
      "url": "https://..."
    }
  ]
}
```

That gives you a very powerful model:

```text
                 ┌── Refugee ───────┐
                 │                   │
HOME ────────────┼── Asylum seeker ──┼── Housing ──┐
                 │                   │              │
                 └── Disaster ──────┘              ↓
                                            Housing Resources
```

One resource destination can be shared by **dozens of personas and tasks**.

---

## The end result

Your application can become almost ridiculously simple:

```tsx
function App() {
  const pageId = getCurrentPageId();

  const page = sitemap.pages[pageId];

  return (
    <>
      <Header />

      <Breadcrumbs pageId={pageId} />

      <PageRenderer page={page} />

      <Footer />
    </>
  );
}
```

The sitemap controls **what exists**.

React controls **how it looks**.

The router controls **where you are**.

And the links between IDs control **how people move through the information architecture**.

That's a really solid foundation for the project, especially because you can later swap the JSON file for an API/CMS without fundamentally changing the React application.
