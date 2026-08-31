import type { Resource } from "../types/sitemap";

type ResourceCardProps = {
  resource: Resource;
};

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h3 className="card-title h5">{resource.title}</h3>
          {resource.description && (
            <p className="card-text flex-grow-1">{resource.description}</p>
          )}
          <a
            href={resource.url}
            className="btn btn-outline-primary mt-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit resource <i className="bi bi-box-arrow-up-right ms-1"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
