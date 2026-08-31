import { useMemo } from "react";
import type { Page, Sitemap } from "../types/sitemap";
import { PageCard } from "../components/PageCard";

type HomePageProps = {
  page: Page;
  sitemap: Sitemap;
  onNavigate: (pageId: string) => void;
  randomizeOrder: boolean;
};

// Fisher-Yates shuffle, returning a new array so the sitemap's data is left untouched.
const shuffle = <T,>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const HomePage = ({
  page,
  sitemap,
  onNavigate,
  randomizeOrder,
}: HomePageProps) => {
  // Randomised once per visit to the home page, to avoid position bias during user testing - unless toggled off.
  const shuffledChildren = useMemo(
    () =>
      randomizeOrder ? shuffle(page.children ?? []) : (page.children ?? []),
    [page.children, randomizeOrder],
  );

  return (
    <div className="container-fluid py-2">
      <div className="text-center mb-1">
        <h1 className="display-4 mb-3">{page.title}</h1>
        {page.description && (
          <p className="lead text-muted">{page.description}</p>
        )}
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-3">
        {shuffledChildren.map((childId) => {
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
