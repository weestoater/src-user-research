import type { Page, Sitemap } from "../types/sitemap";
import { PageCard } from "../components/PageCard";

type PersonaPageProps = {
  page: Page;
  sitemap: Sitemap;
  onNavigate: (pageId: string) => void;
};

export const PersonaPage = ({
  page,
  sitemap,
  onNavigate,
}: PersonaPageProps) => {
  return (
    <div className="container py-5">
      <div className="mb-4">
        <h1 className="display-5 mb-3">{page.title}</h1>
        {page.description && (
          <p className="lead text-muted">{page.description}</p>
        )}
      </div>

      {/* <h2 className="h4 mb-4">What would you like to do?</h2> */}

      <div className="row">
        {page.children?.map((childId) => {
          const child = sitemap.pages[childId];
          return (
            <PageCard
              key={child.id}
              title={child.title}
              description={child.description}
              onClick={() => onNavigate(child.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
