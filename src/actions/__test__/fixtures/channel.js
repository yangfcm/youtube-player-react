export const channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw";
export const channelIntro = {
  kind: "youtube#channelListResponse",
  pageInfo: {
    totalResults: 1,
    resultsPerPage: 1,
  },
  items: [
    {
      id: channelId,
      kind: "youtube#channel",
      snippet: {
        title: "Google Developers",
        country: "US",
        description: "Channel description",
        publishedAt: "2007-08-23T00:34:43Z",
        thumbnails: {
          default: {
            height: 88,
            width: 88,
            url: "https://test-thumbnail-default-url.mock",
          },
          high: {
            height: 800,
            width: 800,
            url: "https://test-thumbnail-high-url.mock",
          },
          medium: {
            height: 240,
            width: 240,
            url: "https://test-thumbnail-medium-url.mock",
          },
        },
      },
      statistics: {
        commentCount: 1,
        subscriberCount: 99,
        videoCount: 2,
        viewCount: 100,
      },
    },
  ],
};
