import type { Sitemap } from "../types/sitemap";

type BreadcrumbsProps = {
  currentPageId: string;
  sitemap: Sitemap;
  onNavigate: (pageId: string) => void;
};

export const Breadcrumbs = ({
  currentPageId,
  sitemap,
  onNavigate,
}: BreadcrumbsProps) => {
  const buildBreadcrumbs = (pageId: string): string[] => {
    const breadcrumbs: string[] = [];
    let current = pageId;

    // Build breadcrumb trail by finding parents
    while (current) {
      breadcrumbs.unshift(current);
      const parent = Object.values(sitemap.pages).find((page) =>
        page.children?.includes(current),
      );
      if (parent) {
        current = parent.id;
      } else {
        break;
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs(currentPageId);

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbs.map((pageId, index) => {
          const page = sitemap.pages[pageId];
          const isLast = index === breadcrumbs.length - 1;

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
