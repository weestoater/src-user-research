import type { Page, Sitemap } from "../types/sitemap";
import { HomePage } from "../pages/HomePage";
import { PersonaPage } from "../pages/PersonaPage";
import { JourneyPage } from "../pages/JourneyPage";
import { TaskPage } from "../pages/TaskPage";
import { ResourcePage } from "../pages/ResourcePage";
import { CountrySelectorPage } from "../pages/CountrySelectorPage";
import { ArticlePage } from "../pages/ArticlePage";

type PageRendererProps = {
  page: Page;
  sitemap: Sitemap;
  onNavigate: (pageId: string) => void;
  randomizeHomeOrder: boolean;
};

export const PageRenderer = ({
  page,
  sitemap,
  onNavigate,
  randomizeHomeOrder,
}: PageRendererProps) => {
  switch (page.type) {
    case "home":
      return (
        <HomePage
          page={page}
          sitemap={sitemap}
          onNavigate={onNavigate}
          randomizeOrder={randomizeHomeOrder}
        />
      );

    case "persona":
      return (
        <PersonaPage page={page} sitemap={sitemap} onNavigate={onNavigate} />
      );

    case "journey":
      return (
        <JourneyPage page={page} sitemap={sitemap} onNavigate={onNavigate} />
      );

    case "task":
      return <TaskPage page={page} sitemap={sitemap} onNavigate={onNavigate} />;

    case "country-selector":
      return (
        <CountrySelectorPage
          page={page}
          sitemap={sitemap}
          onNavigate={onNavigate}
        />
      );

    case "article":
      return (
        <ArticlePage page={page} sitemap={sitemap} onNavigate={onNavigate} />
      );

    case "resource-list":
      return <ResourcePage page={page} />;

    default:
      return (
        <div className="container py-5">
          <div className="alert alert-warning">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Unknown page type: {page.type}
          </div>
        </div>
      );
  }
};
