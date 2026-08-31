import { useState } from "react";
import sitemap from "./data/user-research.json";
import type { Sitemap } from "./types/sitemap";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { PageRenderer } from "./components/PageRenderer";

const typedSitemap = sitemap as Sitemap;

function App() {
  // Trail of visited page ids from home to the current page, used for breadcrumbs.
  const [trail, setTrail] = useState<string[]>([typedSitemap.site.home]);

  const currentPageId = trail[trail.length - 1];
  const page = typedSitemap.pages[currentPageId];

  const handleNavigate = (pageId: string) => {
    setTrail((prev) => {
      const existingIndex = prev.indexOf(pageId);
      // Re-navigating to a page already in the trail (e.g. via a breadcrumb) truncates it, rather than appending a duplicate.
      return existingIndex !== -1
        ? prev.slice(0, existingIndex + 1)
        : [...prev, pageId];
    });
    window.scrollTo(0, 0);
  };

  const handleHome = () => {
    setTrail([typedSitemap.site.home]);
    window.scrollTo(0, 0);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onHomeClick={handleHome} />

      <main className="flex-grow-1">
        <div className="container py-3">
          <Breadcrumbs
            trail={trail}
            sitemap={typedSitemap}
            onNavigate={handleNavigate}
          />
        </div>

        <PageRenderer
          page={page}
          sitemap={typedSitemap}
          onNavigate={handleNavigate}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
