const highThumbnailMockUrl = "https://test-thumbnail-high-url.mock";
const mediumThumbnailMockUrl = "https://test-thumbnail-medium-url.mock";
const defaultThumbnailMockUrl = "https://test-thumbnail-default-url.mock";

export const channelItem1 = {
  id: "EsU196kr7oUmVy38tJbmsYdgg76uNHp8yUt0EenGyb4",
  kind: "youtube#subscription",
  snippet: {
    channelId: "UC4ZrkawfeduKHUrm_K1RUag",
    title: "Subscribe channel 1",
    description: "Channel 1 description",
    publishedAt: "2020-07-06T11:40:27.364000Z",
    resourceId: {
      channelId: "UCHaHD477h-FeBbVh9Sh7syA",
      kind: "youtube#channel",
    },
    thumbnails: {
      default: {
        url: defaultThumbnailMockUrl,
      },
      high: {
        url: highThumbnailMockUrl,
      },
      medium: {
        url: mediumThumbnailMockUrl,
      },
    },
  },
};

export const channelItem2 = {
  id: "EsU196kr7oUmVy38tJbmsYdgg76uNHp8yUt0EenGyb4",
  kind: "youtube#subscription",
  snippet: {
    channelId: "UC4ZrkawfeduKHUrm_K1RUag",
    title: "Subscribe channel ONE",
    description: "Channel 1 description",
    publishedAt: "2020-07-06T11:40:27.364000Z",
    resourceId: {
      channelId: "UCHaHD477h-FeBbVh9Sh7syA",
      kind: "youtube#channel",
    },
    thumbnails: {
      default: {
        url: defaultThumbnailMockUrl,
      },
      high: {
        url: highThumbnailMockUrl,
      },
      medium: {
        url: mediumThumbnailMockUrl,
      },
    },
  },
};

export const channelItem3 = {
  id: "EsU196kr7oUmVy38tJbmseoTMfoOwDJ60HsMDRwK97A",
  kind: "youtube#subscription",
  snippet: {
    channelId: "UC4ZrkawfeduKHUrm_K1RUag",
    title: "Subscribe channel THREE",
    description: "Channel 3 description",
    publishedAt: "2018-03-13T04:03:56.053000Z",
    resourceId: {
      channelId: "UCAuUUnT6oDeKwE6v1NGQxug",
      kind: "youtube#channel",
    },
    thumbnails: {
      default: {
        url: defaultThumbnailMockUrl,
      },
      high: {
        url: highThumbnailMockUrl,
      },
      medium: {
        url: mediumThumbnailMockUrl,
      },
    },
  },
};

export const channelIntro = {
  kind: "youtube#channelListResponse",
  pageInfo: {
    totalResults: 1,
    resultsPerPage: 1,
  },
  items: [
    {
      id: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
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
            url: defaultThumbnailMockUrl,
          },
          high: {
            height: 800,
            width: 800,
            url: highThumbnailMockUrl,
          },
          medium: {
            height: 240,
            width: 240,
            url: mediumThumbnailMockUrl,
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

const channelItems = [channelItem1, channelItem2, channelItem3];
export const subscriptions = {
  items: channelItems,
  kind: "youtube#SubscriptionListResponse",
  pageInfo: {
    totalResults: channelItems.length,
    resultsPerPage: 50,
  },
};
