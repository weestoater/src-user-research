import type { Page } from "../types/sitemap";
import { ResourceCard } from "../components/ResourceCard";

type ResourcePageProps = {
  page: Page;
};

export const ResourcePage = ({ page }: ResourcePageProps) => {
  return (
    <div className="container py-5">
      <div className="mb-4">
        <h1 className="h2 mb-3">{page.title}</h1>
        {page.description && <p className="text-muted">{page.description}</p>}
      </div>

      {page.resources && page.resources.length > 0 ? (
        <div className="row">
          {page.resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          No resources available at this time.
        </div>
      )}
    </div>
  );
};
