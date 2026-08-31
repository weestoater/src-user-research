import type { Sitemap } from "../types/sitemap";

type BreadcrumbsProps = {
  trail: string[];
  sitemap: Sitemap;
  onNavigate: (pageId: string) => void;
};

export const Breadcrumbs = ({
  trail,
  sitemap,
  onNavigate,
}: BreadcrumbsProps) => {
  if (trail.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {trail.map((pageId, index) => {
          const page = sitemap.pages[pageId];
          const isLast = index === trail.length - 1;

          return (
            <li
              key={pageId}
              className={`breadcrumb-item ${isLast ? "active" : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              {isLast ? (
                page.title
              ) : (
                <button
                  className="btn btn-link p-0 text-decoration-none"
                  onClick={() => onNavigate(pageId)}
                >
                  {page.title}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
