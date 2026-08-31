import type { Page, Sitemap } from "../types/sitemap";
import { PageCard } from "../components/PageCard";

type TaskPageProps = {
  page: Page;
  sitemap: Sitemap;
  onNavigate: (pageId: string) => void;
};

export const TaskPage = ({ page, sitemap, onNavigate }: TaskPageProps) => {
  return (
    <div className="container py-5">
      <div className="mb-4">
        <h1 className="h2 mb-3">{page.title}</h1>
        {page.description && <p className="text-muted">{page.description}</p>}
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
