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

export interface LocationResponse {
  ipAddress: string;
  countryCode: string;
  countryName: string;
  city: string;
}
