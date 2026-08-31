import type { Page, Sitemap } from "../types/sitemap";
import { PageCard } from "../components/PageCard";

type HomePageProps = {
  page: Page;
  sitemap: Sitemap;
  onNavigate: (pageId: string) => void;
};

export const HomePage = ({ page, sitemap, onNavigate }: HomePageProps) => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 mb-3">{page.title}</h1>
        {page.description && (
          <p className="lead text-muted">{page.description}</p>
        )}
      </div>

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
