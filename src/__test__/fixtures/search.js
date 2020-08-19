const keyword = "google dev";
const searchResultEmptyResponse = {
  kind: "youtube#searchListResponse",
  etag: "IX4R6BvZcahFciPQJhzo7kYJPiU",
  regionCode: "AU",
  pageInfo: {
    totalResults: 0,
    resultsPerPage: 15,
  },
  items: [],
};
const searchResultResponse = {
  kind: "youtube#searchListResponse",
  etag: "LNH5OOl5xjwz3xw70eQwX7JXlXo",
  nextPageToken: "CAUQAA",
  regionCode: "AU",
  pageInfo: {
    totalResults: 1000000,
    resultsPerPage: 5,
  },
  items: [
    {
      kind: "youtube#searchResult",
      etag: "XYpvNChnzsvfjhXgkodwf1QKZsA",
      id: {
        kind: "youtube#channel",
        channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
      },
      snippet: {
        publishedAt: "2007-08-23T00:34:43Z",
        channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
        title: "Google Developers",
        description:
          "The Google Developers channel features talks from events, educational series, best practices, tips, and the latest updates across our products and platforms.",
        thumbnails: {
          default: {
            url:
              "https://yt3.ggpht.com/-Fgp8KFpgQqE/AAAAAAAAAAI/AAAAAAAAAAA/Wyh1vV5Up0I/s88-c-k-no-mo-rj-c0xffffff/photo.jpg",
          },
          medium: {
            url:
              "https://yt3.ggpht.com/-Fgp8KFpgQqE/AAAAAAAAAAI/AAAAAAAAAAA/Wyh1vV5Up0I/s240-c-k-no-mo-rj-c0xffffff/photo.jpg",
          },
          high: {
            url:
              "https://yt3.ggpht.com/-Fgp8KFpgQqE/AAAAAAAAAAI/AAAAAAAAAAA/Wyh1vV5Up0I/s800-c-k-no-mo-rj-c0xffffff/photo.jpg",
          },
        },
        channelTitle: "Google Developers",
        liveBroadcastContent: "none",
        publishTime: "2007-08-23T00:34:43Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "LVcDd4wjf6nftSQTOeuSrsWPisQ",
      id: {
        kind: "youtube#channel",
        channelId: "UCnUYZLuoy1rq1aVMwx4aTzw",
      },
      snippet: {
        publishedAt: "2012-04-24T00:05:52Z",
        channelId: "UCnUYZLuoy1rq1aVMwx4aTzw",
        title: "Google Chrome Developers",
        description: "Making the web more awesome.",
        thumbnails: {
          default: {
            url:
              "https://yt3.ggpht.com/-9X-_QJu0RvQ/AAAAAAAAAAI/AAAAAAAAAAA/X3cPcZ5icto/s88-c-k-no-mo-rj-c0xffffff/photo.jpg",
          },
          medium: {
            url:
              "https://yt3.ggpht.com/-9X-_QJu0RvQ/AAAAAAAAAAI/AAAAAAAAAAA/X3cPcZ5icto/s240-c-k-no-mo-rj-c0xffffff/photo.jpg",
          },
          high: {
            url:
              "https://yt3.ggpht.com/-9X-_QJu0RvQ/AAAAAAAAAAI/AAAAAAAAAAA/X3cPcZ5icto/s800-c-k-no-mo-rj-c0xffffff/photo.jpg",
          },
        },
        channelTitle: "Google Chrome Developers",
        liveBroadcastContent: "none",
        publishTime: "2012-04-24T00:05:52Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "gnr-mSrcXXuX3s59GvE0ArOWaUg",
      id: {
        kind: "youtube#playlist",
        playlistId: "IDZyZMYn3H0",
      },
      snippet: {
        publishedAt: "2019-05-23T21:06:17Z",
        channelId: "UCsBjURrPoezykLs9EqgamOA",
        title: "How to Become a Google Developer Expert (GDE)",
        description:
          "What does it take to become a Google Developer Expert? Learn about my own experience becoming a GDE with practical advice for working towards this goal.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/IDZyZMYn3H0/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/IDZyZMYn3H0/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/IDZyZMYn3H0/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Fireship",
        liveBroadcastContent: "none",
        publishTime: "2019-05-23T21:06:17Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "fUy83ga9B0qPSeFNWMj7RhWuLUY",
      id: {
        kind: "youtube#video",
        videoId: "H89hKw06iWs",
      },
      snippet: {
        publishedAt: "2020-06-30T16:00:10Z",
        channelId: "UCnUYZLuoy1rq1aVMwx4aTzw",
        title: "web.dev LIVE 2020: Day One",
        description:
          "Join us for day 1 of web.dev LIVE as we head to the Americas timezone to provide helpful content on Performance and Discovery through Search. Enjoy the ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/H89hKw06iWs/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/H89hKw06iWs/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/H89hKw06iWs/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Google Chrome Developers",
        liveBroadcastContent: "none",
        publishTime: "2020-06-30T16:00:10Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "jK7Ncy4_CI-PKWWCXXrJSD-cQBs",
      id: {
        kind: "youtube#video",
        videoId: "oHBFD8cfXho",
      },
      snippet: {
        publishedAt: "2019-09-24T14:00:09Z",
        channelId: "UCaO6VoaYJv4kS-TQO_M-N_g",
        title: "A REAL Day in the Life of a Google Software Engineer",
        description:
          "This is what a real day in the life of a Google Software Engineer looks like. What I worked on at Google: https://youtu.be/Az_PtvMt5_Y Song at the beginning of ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/oHBFD8cfXho/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/oHBFD8cfXho/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/oHBFD8cfXho/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Clément Mihailescu",
        liveBroadcastContent: "none",
        publishTime: "2019-09-24T14:00:09Z",
      },
    },
  ],
};

const searchErrorResponse = {
  response: {
    data: {
      error: {
        code: 400,
        message: "'snippe'",
        errors: [
          {
            message: "'snippe'",
            domain: "youtube.part",
            reason: "unknownPart",
            location: "part",
            locationType: "parameter",
          },
        ],
      },
    },
  },
};
const channelVideosResponse = {
  kind: "youtube#searchListResponse",
  etag: "dultux9MhxfrHgjnPn_OYDkbuto",
  nextPageToken: "CA8QAA",
  regionCode: "AU",
  pageInfo: {
    totalResults: 2369,
    resultsPerPage: 15,
  },
  items: [
    {
      kind: "youtube#searchResult",
      etag: "wvWVAhl-fEqLm-GtubwZDsEr1Vg",
      id: {
        kind: "youtube#video",
        videoId: "McOW1uIE4GY",
      },
      snippet: {
        publishedAt: "2020-08-04T12:00:37Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title: "Coronavirus: UN warns of new diseases - News Review",
        description:
          "The UN is warning that more zoonotic diseases like Ebola, West Nile fever, SARS and Covid-19 could make the jump from animals to humans unless we change ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/McOW1uIE4GY/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/McOW1uIE4GY/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/McOW1uIE4GY/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-08-04T12:00:37Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "PsNDQBiYjGqNVI4Z8mfnQoOP8EI",
      id: {
        kind: "youtube#video",
        videoId: "k4vpvOcYd3o",
      },
      snippet: {
        publishedAt: "2020-08-03T14:52:47Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title: "4 uses of &#39;fair&#39; - English In A Minute",
        description:
          "The adjective 'fair' has lots of meanings, and James is here to give you a fair understanding of them! See if you can answer the quiz question: What does 'fair' ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/k4vpvOcYd3o/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/k4vpvOcYd3o/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/k4vpvOcYd3o/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-08-03T14:52:47Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "6cRhkMfIn0GOiyKHzgCX4saBbzY",
      id: {
        kind: "youtube#video",
        videoId: "jIx8-Qmvs7U",
      },
      snippet: {
        publishedAt: "2020-08-03T10:45:41Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title: "The new meaning of &#39;cancelled&#39; - The English We Speak",
        description:
          "When an event is 'cancelled', it's not going to happen anymore but this word has a new meaning. Rob's about to find out that how someone in public life can be ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/jIx8-Qmvs7U/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/jIx8-Qmvs7U/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/jIx8-Qmvs7U/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-08-03T10:45:41Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "xzlMyvQ-0WBbUdqNNfD0A0bKPmY",
      id: {
        kind: "youtube#video",
        videoId: "gu_GfdJpdsA",
      },
      snippet: {
        publishedAt: "2020-07-30T13:38:24Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title: "The medicine of coronavirus - 6 Minute English",
        description:
          "In this programme, we'll be looking at the origins of Covid-19 and hearing new evidence about the scale of the threat we face from the disease. And of course ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/gu_GfdJpdsA/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/gu_GfdJpdsA/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/gu_GfdJpdsA/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-07-30T13:38:24Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "PjJ4BGj4sA-YT7yXETTnoeasO-s",
      id: {
        kind: "youtube#video",
        videoId: "TQ6tQxNUm10",
      },
      snippet: {
        publishedAt: "2020-07-28T12:38:02Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title: "A plan to bring live music back - News Review",
        description:
          "Melvin Benn, managing director of Festival Republic, wants to use compulsory coronavirus testing at music festivals. Avoiding gatherings is considered a crucial ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/TQ6tQxNUm10/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/TQ6tQxNUm10/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/TQ6tQxNUm10/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-07-28T12:38:02Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "jSGZwjE3zNXlaM3OVKn0P7kwNYs",
      id: {
        kind: "youtube#video",
        videoId: "diFnTcWb49U",
      },
      snippet: {
        publishedAt: "2020-07-27T13:37:39Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title: "Ways to say &#39;sorry&#39; Part 1 - English In A Minute",
        description:
          "People in the UK like saying 'sorry' a lot! Learn different ways of apologising with Sam, and then test yourself with this quiz: \"I apologised ___ my mother ___ ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/diFnTcWb49U/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/diFnTcWb49U/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/diFnTcWb49U/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-07-27T13:37:39Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "SqlGc33jyb9QBzRd5YoH9_UkPTo",
      id: {
        kind: "youtube#video",
        videoId: "Sk1oi_5mHQQ",
      },
      snippet: {
        publishedAt: "2020-07-27T11:48:17Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title:
          "What does &#39;new normal&#39; mean? Listen to The English We Speak",
        description:
          "Our daily lives have changed since the coronavirus outbreak started. We've had to change the daily routines we've become used to and this has led to a new ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/Sk1oi_5mHQQ/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/Sk1oi_5mHQQ/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/Sk1oi_5mHQQ/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-07-27T11:48:17Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "zOJF1xsWzDzO-S2aMyqpKbtMWOg",
      id: {
        kind: "youtube#video",
        videoId: "TItI5ucoZnA",
      },
      snippet: {
        publishedAt: "2020-07-13T14:41:46Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title: "As if vs As though - English In A Minute",
        description:
          "Do you how know to use 'as if' and 'as though'? Georgina explains in one minute! Watch the video and complete the sentence: “I feel as if I ______ at all, but I ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/TItI5ucoZnA/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/TItI5ucoZnA/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/TItI5ucoZnA/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-07-13T14:41:46Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "9IwLTcgfOfgg90jlYk1LicrcYTQ",
      id: {
        kind: "youtube#video",
        videoId: "glK2V-7DJD8",
      },
      snippet: {
        publishedAt: "2020-07-09T13:11:02Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title: "Covid-19: The office after lockdown - 6 Minute English",
        description:
          "The coronavirus outbreak is changing the workplace. As employees slowly return to work after lockdown, tech companies are busy finding ways for them to ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/glK2V-7DJD8/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/glK2V-7DJD8/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/glK2V-7DJD8/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-07-09T13:11:02Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "GVGi-Ug4MgWhgZOk8f2jLYl073U",
      id: {
        kind: "youtube#video",
        videoId: "sT6qRBjlqyw",
      },
      snippet: {
        publishedAt: "2020-07-07T15:04:19Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title: "The Proms: Music festival from home  - News Review",
        description:
          "Learn English vocabulary to talk about the news. The BBC Proms will go ahead this summer in London – but not as we know it. The season will start with ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/sT6qRBjlqyw/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/sT6qRBjlqyw/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/sT6qRBjlqyw/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-07-07T15:04:19Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "1rSDJK0KJUHjgRzuO6i2NFIWbRE",
      id: {
        kind: "youtube#video",
        videoId: "7ZJxdmEKn0Q",
      },
      snippet: {
        publishedAt: "2020-07-02T13:42:13Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title: "Should we wear a face mask? 6 Minute English",
        description:
          "With the outbreak of the coronavirus epidemic, people in many countries around the world have started wearing face masks to protect both themselves and ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/7ZJxdmEKn0Q/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/7ZJxdmEKn0Q/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/7ZJxdmEKn0Q/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-07-02T13:42:13Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "OYKNh-uFtMNajcat9HosWRZpBWw",
      id: {
        kind: "youtube#video",
        videoId: "SlNDqPInXgc",
      },
      snippet: {
        publishedAt: "2020-06-30T14:47:15Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title: "Coronavirus: Half million deaths - News Review",
        description:
          "Learn English vocabulary to talk about the news. The coronavirus pandemic has now claimed the lives of more than half a million people worldwide. The United ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/SlNDqPInXgc/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/SlNDqPInXgc/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/SlNDqPInXgc/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-06-30T14:47:15Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "3o3TWgEqRJBCREBTudglYLuvYfo",
      id: {
        kind: "youtube#video",
        videoId: "Vx-v84KLDko",
      },
      snippet: {
        publishedAt: "2020-06-16T15:05:23Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title: "Black Lives Matter: Racism at London protest - News Review",
        description:
          "Learn English vocabulary to talk about the news. A demonstration in support of Black Lives Matters in London turned ugly when more than 100 far-right ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/Vx-v84KLDko/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/Vx-v84KLDko/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/Vx-v84KLDko/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-06-16T15:05:23Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "X92HkxkHmckn-T9KAVGzwWE6J6Q",
      id: {
        kind: "youtube#video",
        videoId: "_WHCjv1MRmM",
      },
      snippet: {
        publishedAt: "2020-06-11T14:41:46Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title: "The food delivery revolution - 6 Minute English",
        description:
          "Takeaway apps are changing food culture - if in the past, food delivery meant having a pizza or a curry when you didn't feel like cooking, now you can find ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/_WHCjv1MRmM/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/_WHCjv1MRmM/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/_WHCjv1MRmM/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-06-11T14:41:46Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "CF8K0DoaAE1-vHXJJNItjupRgLE",
      id: {
        kind: "youtube#video",
        videoId: "v3QC1LII9jY",
      },
      snippet: {
        publishedAt: "2020-06-09T14:23:29Z",
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        title: "Can you sleep during lockdown? - News Review",
        description:
          "Do you have issues sleeping? It seems some people – in the UK at least – are finding it hard to sleep during lockdown. Researchers at Kings College London ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/v3QC1LII9jY/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/v3QC1LII9jY/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/v3QC1LII9jY/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BBC Learning English",
        liveBroadcastContent: "none",
        publishTime: "2020-06-09T14:23:29Z",
      },
    },
  ],
};

export {
  keyword,
  searchResultEmptyResponse,
  searchResultResponse,
  searchErrorResponse,
  channelVideosResponse,
};
