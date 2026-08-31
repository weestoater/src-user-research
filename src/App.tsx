import { useState } from "react";
import sitemap from "./data/user-research.json";
import type { Sitemap } from "./types/sitemap";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { PageRenderer } from "./components/PageRenderer";

const typedSitemap = sitemap as Sitemap;

function App() {
  const [currentPageId, setCurrentPageId] = useState(typedSitemap.site.home);

  const page = typedSitemap.pages[currentPageId];

  const handleNavigate = (pageId: string) => {
    setCurrentPageId(pageId);
    window.scrollTo(0, 0);
  };

  const handleHome = () => {
    setCurrentPageId(typedSitemap.site.home);
    window.scrollTo(0, 0);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onHomeClick={handleHome} />

      <main className="flex-grow-1">
        <div className="container py-3">
          <Breadcrumbs
            currentPageId={currentPageId}
            sitemap={typedSitemap}
            onNavigate={handleNavigate}
          />
        </div>

        <PageRenderer
          page={page}
          sitemap={typedSitemap}
          onNavigate={handleNavigate}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
