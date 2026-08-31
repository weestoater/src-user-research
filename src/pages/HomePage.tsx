import type { Page, Sitemap } from "../types/sitemap";
import { PageCard } from "../components/PageCard";

type HomePageProps = {
  page: Page;
  sitemap: Sitemap;
  onNavigate: (pageId: string) => void;
};

export const HomePage = ({ page, sitemap, onNavigate }: HomePageProps) => {
  return (
    <div className="container-fluid py-2">
      <div className="text-center mb-1">
        <h1 className="display-4 mb-3">{page.title}</h1>
        {page.description && (
          <p className="lead text-muted">{page.description}</p>
        )}
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-3">
        {page.children?.map((childId) => {
          const child = sitemap.pages[childId];
          return (
            <PageCard
              key={child.id}
              title={child.title}
              description={child.description}
              onClick={() => onNavigate(child.id)}
              colClassName="col"
            />
          );
        })}
      </div>
    </div>
  );
};
