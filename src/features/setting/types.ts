export interface SettingState {
  openSidebar: boolean;
  darkTheme: boolean;
  region?: string;
  categories?: CategoriesResponse;
}

export interface CategorySnippet {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    assignable: boolean;
    channelId: string;
    title: string;
  };
}

export interface CategoriesResponse {
  etag: string;
  items: CategorySnippet[];
  kind: string;
}

export interface RegionSnippet {
  etag: string;
  id: string;
  kind: string;
}

export interface RegionsResponse {
  etag: string;
  items: RegionSnippet[];
  kind: string;
}
