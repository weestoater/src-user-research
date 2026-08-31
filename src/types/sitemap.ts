export type Resource = {
  id: string;
  title: string;
  description?: string;
  url: string;
};

export type Page = {
  id: string;
  type:
    | "home"
    | "persona"
    | "journey"
    | "task"
    | "resource-list"
    | "country-selector"
    | "article";
  title: string;
  description?: string;
  children?: string[];
  resources?: Resource[];
  navigation?: {
    back?: boolean;
    home?: boolean;
  };
};

export type Sitemap = {
  site: {
    title: string;
    home: string;
  };
  pages: {
    [key: string]: Page;
  };
};
