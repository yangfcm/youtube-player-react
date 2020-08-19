const videoId = "-uR-iqh1x1Q";
const commentId = "UgyQOgj_e7mQTILEmpV4AaABAg";
const channelId = "UCAuUUnT6oDeKwE6v1NGQxug";
const commentErrorResponse = {
  response: {
    data: {
      error: {
        code: 400,
        message:
          "'No filter selected. Expected one of: channelId, allThreadsRelatedToChannelId, videoId, id'",
        errors: [
          {
            message:
              "'No filter selected. Expected one of: channelId, allThreadsRelatedToChannelId, videoId, id'",
            domain: "youtube.parameter",
            reason: "missingRequiredParameter",
            location: "parameters.",
            locationType: "other",
          },
        ],
      },
    },
  },
};
const commentDisabledErrorResponse = {
  response: {
    data: {
      error: {
        code: 403,
        message:
          'The video identified by the \u003ccode\u003e\u003ca href="/youtube/v3/docs/commentThreads/list#videoId"\u003evideoId\u003c/a\u003e\u003c/code\u003e parameter has disabled comments.',
        errors: [
          {
            message:
              'The video identified by the \u003ccode\u003e\u003ca href="/youtube/v3/docs/commentThreads/list#videoId"\u003evideoId\u003c/a\u003e\u003c/code\u003e parameter has disabled comments.',
            domain: "youtube.commentThread",
            reason: "commentsDisabled",
            location: "videoId",
            locationType: "parameter",
          },
        ],
      },
    },
  },
};
const addedCommentResponse = {
  kind: "youtube#commentThread",
  etag: "6lYUIRvzgAPsfhGwz90Qnk1dsvY",
  id: "UgxynVLSbqk1rRDSaT14AaABAg",
  snippet: {
    channelId: "UCAuUUnT6oDeKwE6v1NGQxug",
    videoId: "-uR-iqh1x1Q",
    topLevelComment: {
      kind: "youtube#comment",
      etag: "XFca9ZjiAw7bwRcmlhSn2nC6_KI",
      id: "UgxynVLSbqk1rRDSaT14AaABAg",
      snippet: {
        channelId: "UCAuUUnT6oDeKwE6v1NGQxug",
        videoId: "-uR-iqh1x1Q",
        textDisplay: "good talk!",
        textOriginal: "good talk!",
        authorDisplayName: "Fan Yang",
        authorProfileImageUrl:
          "https://yt3.ggpht.com/a/AATXAJywvEpy7tpO6BFq_AWy5bB_mxUU4Ax50yfNrOQ5=s48-c-k-c0xffffffff-no-rj-mo",
        authorChannelUrl:
          "http://www.youtube.com/channel/UC4ZrkawfeduKHUrm_K1RUag",
        authorChannelId: {
          value: "UC4ZrkawfeduKHUrm_K1RUag",
        },
        canRate: true,
        viewerRating: "none",
        likeCount: 0,
        moderationStatus: "heldForReview",
        publishedAt: "2020-07-20T13:58:48Z",
        updatedAt: "2020-07-20T13:58:48Z",
      },
    },
    canReply: true,
    totalReplyCount: 0,
    isPublic: true,
  },
};
const commentsResponse = {
  kind: "youtube#commentThreadListResponse",
  etag: "RopPrr-FqrUWyppDq1Adl208uBo",
  nextPageToken:
    "QURTSl9pMzVnY2lzZVJCVEI0U3BMVGcwWVktdWlWYkd4dXRfR25JMzdWLTVRVUNfWElnUTVmczJ2LXpvQ0g1TjkxLTNIc0ZWbk9IaXFUSEZsazhXS3B2ZnB3RUVOMWt6eXdiWHZBaHJyY2h0RGhUOEZ1Uzh6ZVJMVURfRnRMZTl2SS1BemRHQ2JJdU54alMwa3FKaHFVZ2d6MEc1bHRMTWFfQ3g4Vk0tNFd2N01NUTJkdnRVQWttOVI0ckZJUVBoSDlTVXZaUldRT2FwejR2NHYxa0FrOVNILUJYanBoTFhrRGY0UHlYTUcyNTlpU0R1SGh5Z09wVmxlUW1qclRmTWhzRkJtOUVuV3JtY2tGakR1cGtVenc=",
  pageInfo: {
    totalResults: 12,
    resultsPerPage: 12,
  },
  items: [
    {
      kind: "youtube#commentThread",
      etag: "3C6S-WEYMVGm8IfBtRjDA-i2lmM",
      id: "UgyQOgj_e7mQTILEmpV4AaABAg",
      snippet: {
        videoId: "-uR-iqh1x1Q",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "cYTw8bXEWD0yu6UZtWDv4Ynjs7w",
          id: "UgyQOgj_e7mQTILEmpV4AaABAg",
          snippet: {
            videoId: "-uR-iqh1x1Q",
            textDisplay:
              "She only wanted to be president, she and her children stole everything and left the country in poverty and in the hands of another criminal, we basically have no country to go to, Liberia is now the poorest in the world. Yes I said it she’s a criminal.",
            textOriginal:
              "She only wanted to be president, she and her children stole everything and left the country in poverty and in the hands of another criminal, we basically have no country to go to, Liberia is now the poorest in the world. Yes I said it she’s a criminal.",
            authorDisplayName: "Lucia Lakpor",
            authorProfileImageUrl:
              "https://yt3.ggpht.com/a/AATXAJxSLxDsYIuligoT4HSSVXBAEKk-MbmjBa4O606L=s48-c-k-c0xffffffff-no-rj-mo",
            authorChannelUrl:
              "http://www.youtube.com/channel/UCrHjC2bL9t2C4555ebY0MCQ",
            authorChannelId: {
              value: "UCrHjC2bL9t2C4555ebY0MCQ",
            },
            canRate: true,
            viewerRating: "none",
            likeCount: 162,
            publishedAt: "2020-07-17T20:42:13Z",
            updatedAt: "2020-07-17T21:35:42Z",
          },
        },
        canReply: true,
        totalReplyCount: 5,
        isPublic: true,
      },
    },
    {
      kind: "youtube#commentThread",
      etag: "J3b6twnZIImIJHK6jxRKRbJy8_I",
      id: "UgwRr_8HJggfix5b2NF4AaABAg",
      snippet: {
        videoId: "-uR-iqh1x1Q",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "f3erE_10um0CSZ4jf6BVqA-K3Uc",
          id: "UgwRr_8HJggfix5b2NF4AaABAg",
          snippet: {
            videoId: "-uR-iqh1x1Q",
            textDisplay:
              "War doesn&#39;t discriminate. War ruins all lives; men, women, children, soldiers, civilians - get your facts straight.",
            textOriginal:
              "War doesn't discriminate. War ruins all lives; men, women, children, soldiers, civilians - get your facts straight.",
            authorDisplayName: "Daniel Deautriell",
            authorProfileImageUrl:
              "https://yt3.ggpht.com/a/AATXAJzX-6ruQAsLcVG43hBtGShrrd2X6UYc45majA=s48-c-k-c0xffffffff-no-rj-mo",
            authorChannelUrl:
              "http://www.youtube.com/channel/UCrRGdEGQ1qbfI0m0eFz2oAQ",
            authorChannelId: {
              value: "UCrRGdEGQ1qbfI0m0eFz2oAQ",
            },
            canRate: true,
            viewerRating: "none",
            likeCount: 49,
            publishedAt: "2020-07-18T03:17:18Z",
            updatedAt: "2020-07-18T03:17:18Z",
          },
        },
        canReply: true,
        totalReplyCount: 0,
        isPublic: true,
      },
    },
    {
      kind: "youtube#commentThread",
      etag: "LlcWLuamhBE8Lal46ODzXED076c",
      id: "Ugze3Sr0BWjSISutl014AaABAg",
      snippet: {
        videoId: "-uR-iqh1x1Q",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "YqlNlvFjClAQqOzkg-rhfFCXRCM",
          id: "Ugze3Sr0BWjSISutl014AaABAg",
          snippet: {
            videoId: "-uR-iqh1x1Q",
            textDisplay:
              "Uhm? “UNICEF Liberia” shows 1 in 10 children die before age 5. 1/3 are malnourished. just read it. Certainly has a lot to brag about! Authoritarian thought police states. NZ, Germany, etc.",
            textOriginal:
              "Uhm? “UNICEF Liberia” shows 1 in 10 children die before age 5. 1/3 are malnourished. just read it. Certainly has a lot to brag about! Authoritarian thought police states. NZ, Germany, etc.",
            authorDisplayName: "rebeltoo37",
            authorProfileImageUrl:
              "https://yt3.ggpht.com/a/AATXAJyw4AiDUS0lo0sKMsY62XWgJu102OA-rdXuOw=s48-c-k-c0xffffffff-no-rj-mo",
            authorChannelUrl:
              "http://www.youtube.com/channel/UCtJWDaA70mMtjE7onJGaGNA",
            authorChannelId: {
              value: "UCtJWDaA70mMtjE7onJGaGNA",
            },
            canRate: true,
            viewerRating: "none",
            likeCount: 7,
            publishedAt: "2020-07-18T15:12:39Z",
            updatedAt: "2020-07-18T15:12:39Z",
          },
        },
        canReply: true,
        totalReplyCount: 0,
        isPublic: true,
      },
    },
    {
      kind: "youtube#commentThread",
      etag: "AAcL8shhZTFEnY8UEQKPC9n1ixI",
      id: "UgxWkrUm7rU9QWHFBYB4AaABAg",
      snippet: {
        videoId: "-uR-iqh1x1Q",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "jjoFuKYNyo026Qrx9ocNvZUrnsQ",
          id: "UgxWkrUm7rU9QWHFBYB4AaABAg",
          snippet: {
            videoId: "-uR-iqh1x1Q",
            textDisplay:
              "This is sexist.  Had a man said this everyone would be up in arms.",
            textOriginal:
              "This is sexist.  Had a man said this everyone would be up in arms.",
            authorDisplayName: "Jack You",
            authorProfileImageUrl:
              "https://yt3.ggpht.com/a/AATXAJwXawxz9-hLhjPiNj8xJMpxdUW2qgaTbH9jaA=s48-c-k-c0xffffffff-no-rj-mo",
            authorChannelUrl:
              "http://www.youtube.com/channel/UCdjLoUoCfSF54o_irk9M4Sw",
            authorChannelId: {
              value: "UCdjLoUoCfSF54o_irk9M4Sw",
            },
            canRate: true,
            viewerRating: "none",
            likeCount: 2,
            publishedAt: "2020-07-19T07:46:15Z",
            updatedAt: "2020-07-19T07:46:15Z",
          },
        },
        canReply: true,
        totalReplyCount: 0,
        isPublic: true,
      },
    },
    {
      kind: "youtube#commentThread",
      etag: "j8h2r4Tjw0SUUWd-5MyBwOGEKcA",
      id: "Ugx7jjnXbe49WBkTkyN4AaABAg",
      snippet: {
        videoId: "-uR-iqh1x1Q",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "imEZogsxFg_eQw04VovZyWQjVGw",
          id: "Ugx7jjnXbe49WBkTkyN4AaABAg",
          snippet: {
            videoId: "-uR-iqh1x1Q",
            textDisplay:
              "Don’t wait around for others to experience life with you. Take the lead, go out, and get the most out of life. Eventually, you’ll have more company than you can handle.",
            textOriginal:
              "Don’t wait around for others to experience life with you. Take the lead, go out, and get the most out of life. Eventually, you’ll have more company than you can handle.",
            authorDisplayName: "WATCH ME",
            authorProfileImageUrl:
              "https://yt3.ggpht.com/a/AATXAJwnQUfGVd8D4MD1N0URrOyqWuteZt4TEA-boqNrOg=s48-c-k-c0xffffffff-no-rj-mo",
            authorChannelUrl:
              "http://www.youtube.com/channel/UCY_USsb9JWzwsdl90RmMV1w",
            authorChannelId: {
              value: "UCY_USsb9JWzwsdl90RmMV1w",
            },
            canRate: true,
            viewerRating: "none",
            likeCount: 46,
            publishedAt: "2020-07-17T20:02:22Z",
            updatedAt: "2020-07-17T20:02:22Z",
          },
        },
        canReply: true,
        totalReplyCount: 1,
        isPublic: true,
      },
    },
    {
      kind: "youtube#commentThread",
      etag: "42DwcmQy9otfdDc5ujaJN_5Cxw4",
      id: "UgzUnoJr7_2BDkMcYqV4AaABAg",
      snippet: {
        videoId: "-uR-iqh1x1Q",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "Fg_Uixq0JzRlSXszR3NBnoK5DrI",
          id: "UgzUnoJr7_2BDkMcYqV4AaABAg",
          snippet: {
            videoId: "-uR-iqh1x1Q",
            textDisplay:
              "&quot;The CEOs of four of the five biggest defense contractors are women.&quot;\u003cbr /\u003e\u003cbr /\u003eThanks, women!",
            textOriginal:
              '"The CEOs of four of the five biggest defense contractors are women."\n\nThanks, women!',
            authorDisplayName: "Monkeyheadtpc",
            authorProfileImageUrl:
              "https://yt3.ggpht.com/a/AATXAJxEn7QATboAUIS_OWGfETi-Vp3uYV9Qc_3CYKL4=s48-c-k-c0xffffffff-no-rj-mo",
            authorChannelUrl:
              "http://www.youtube.com/channel/UCtD8zXJLmw-ZSIxzY6QQI9w",
            authorChannelId: {
              value: "UCtD8zXJLmw-ZSIxzY6QQI9w",
            },
            canRate: true,
            viewerRating: "none",
            likeCount: 38,
            publishedAt: "2020-07-18T11:36:00Z",
            updatedAt: "2020-07-18T11:36:00Z",
          },
        },
        canReply: true,
        totalReplyCount: 0,
        isPublic: true,
      },
    },
    {
      kind: "youtube#commentThread",
      etag: "xSdzrQy8OlZ9fDFZxsgHV6fJ4ws",
      id: "UgwI0UPyAluOiQGV7VB4AaABAg",
      snippet: {
        videoId: "-uR-iqh1x1Q",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "6_8tZzs5v8XI8TY5uAsPf7Ac8xU",
          id: "UgwI0UPyAluOiQGV7VB4AaABAg",
          snippet: {
            videoId: "-uR-iqh1x1Q",
            textDisplay:
              "More Identity politics.  TED has become WOKE.  Divided we fall, united we stand.  ALL LIVES MATTER.",
            textOriginal:
              "More Identity politics.  TED has become WOKE.  Divided we fall, united we stand.  ALL LIVES MATTER.",
            authorDisplayName: "Malcolm Jones",
            authorProfileImageUrl:
              "https://yt3.ggpht.com/a/AATXAJxl6_oh67NUT4TlKU7az57KdrAVjZ4dKbJe4p99=s48-c-k-c0xffffffff-no-rj-mo",
            authorChannelUrl:
              "http://www.youtube.com/channel/UCniqD16Scuc8DIH2uo5Ou_w",
            authorChannelId: {
              value: "UCniqD16Scuc8DIH2uo5Ou_w",
            },
            canRate: true,
            viewerRating: "none",
            likeCount: 3,
            publishedAt: "2020-07-19T01:46:20Z",
            updatedAt: "2020-07-19T01:46:20Z",
          },
        },
        canReply: true,
        totalReplyCount: 0,
        isPublic: true,
      },
    },
    {
      kind: "youtube#commentThread",
      etag: "sPipIcE3dF0A5XWjbvhNSsmNKig",
      id: "Ugy3qdXzXIj50hESk294AaABAg",
      snippet: {
        videoId: "-uR-iqh1x1Q",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "3k5rSdk_y0x6i9hNE0YdnFtxILI",
          id: "Ugy3qdXzXIj50hESk294AaABAg",
          snippet: {
            videoId: "-uR-iqh1x1Q",
            textDisplay: "Feminist clap trap.",
            textOriginal: "Feminist clap trap.",
            authorDisplayName: "Deicide",
            authorProfileImageUrl:
              "https://yt3.ggpht.com/a/AATXAJzRTIhE_8xjcsyaic53H3duILW6IaZTfoODuGJa=s48-c-k-c0xffffffff-no-rj-mo",
            authorChannelUrl:
              "http://www.youtube.com/channel/UCkEHzMnsBHZFo-1leoEIXyw",
            authorChannelId: {
              value: "UCkEHzMnsBHZFo-1leoEIXyw",
            },
            canRate: true,
            viewerRating: "none",
            likeCount: 24,
            publishedAt: "2020-07-18T05:03:09Z",
            updatedAt: "2020-07-18T05:03:09Z",
          },
        },
        canReply: true,
        totalReplyCount: 0,
        isPublic: true,
      },
    },
    {
      kind: "youtube#commentThread",
      etag: "2JNTTAQ1h3UAECfPXxZtqRnfkME",
      id: "UgzkO1tFtezWIvQi0xh4AaABAg",
      snippet: {
        videoId: "-uR-iqh1x1Q",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "lgrqXgKjOlnwdUTDcoMcQDQzfis",
          id: "UgzkO1tFtezWIvQi0xh4AaABAg",
          snippet: {
            videoId: "-uR-iqh1x1Q",
            textDisplay:
              "My only worry with this kind of attitude is that it is a lot easier to just become part of the status quo than it is to actually change anything. The girlboss attitude that Liberalism tends to build through attempts to work within the system is just as repressive as a full, unmodified patriarchy. Let us never forget that the problems of our world lay within as well as without, so we can never forget to criticize our own points of view",
            textOriginal:
              "My only worry with this kind of attitude is that it is a lot easier to just become part of the status quo than it is to actually change anything. The girlboss attitude that Liberalism tends to build through attempts to work within the system is just as repressive as a full, unmodified patriarchy. Let us never forget that the problems of our world lay within as well as without, so we can never forget to criticize our own points of view",
            authorDisplayName: "Shada",
            authorProfileImageUrl:
              "https://yt3.ggpht.com/a/AATXAJwl3E3Uyleve8FtX8wYf7wqfEWEu6IjzsXwQxmWNQ=s48-c-k-c0xffffffff-no-rj-mo",
            authorChannelUrl:
              "http://www.youtube.com/channel/UCWi0a4AUfFPsx-LvRqdrsrA",
            authorChannelId: {
              value: "UCWi0a4AUfFPsx-LvRqdrsrA",
            },
            canRate: true,
            viewerRating: "none",
            likeCount: 6,
            publishedAt: "2020-07-17T23:49:37Z",
            updatedAt: "2020-07-17T23:49:37Z",
          },
        },
        canReply: true,
        totalReplyCount: 0,
        isPublic: true,
      },
    },
    {
      kind: "youtube#commentThread",
      etag: "t5D4tm6AZG_HToGkXOhlZw2wwsE",
      id: "UgyHVt0daPmReX0Yu6t4AaABAg",
      snippet: {
        videoId: "-uR-iqh1x1Q",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "AfN5H8eyDORxTi1YaNdF5QMvCM8",
          id: "UgyHVt0daPmReX0Yu6t4AaABAg",
          snippet: {
            videoId: "-uR-iqh1x1Q",
            textDisplay:
              "Clicked just to see like to dislike ratio.  Wasn&#39;t surprised 😂",
            textOriginal:
              "Clicked just to see like to dislike ratio.  Wasn't surprised 😂",
            authorDisplayName: "Stellular Nebulla",
            authorProfileImageUrl:
              "https://yt3.ggpht.com/a/AATXAJyhDK6PWEI0IjMzI5bd4snKpRKh3sb5VCuNx9jirg=s48-c-k-c0xffffffff-no-rj-mo",
            authorChannelUrl:
              "http://www.youtube.com/channel/UCdT-k5DB6gcsIw2RT3DM8WA",
            authorChannelId: {
              value: "UCdT-k5DB6gcsIw2RT3DM8WA",
            },
            canRate: true,
            viewerRating: "none",
            likeCount: 79,
            publishedAt: "2020-07-18T01:14:06Z",
            updatedAt: "2020-07-18T01:14:06Z",
          },
        },
        canReply: true,
        totalReplyCount: 4,
        isPublic: true,
      },
    },
    {
      kind: "youtube#commentThread",
      etag: "J5rboL8bEX7b3zX0M_cv_y1jutQ",
      id: "UgyCKtyB0o2YNb1i-4F4AaABAg",
      snippet: {
        videoId: "-uR-iqh1x1Q",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "zLgGktkrcHX7ZUhmZxwE6RMDPpg",
          id: "UgyCKtyB0o2YNb1i-4F4AaABAg",
          snippet: {
            videoId: "-uR-iqh1x1Q",
            textDisplay:
              "Women: &quot;we&#39;ve brought freedom, justice and peace to our new empire&quot; us men: &quot;your new empire?&quot;",
            textOriginal:
              'Women: "we\'ve brought freedom, justice and peace to our new empire" us men: "your new empire?"',
            authorDisplayName: "League359",
            authorProfileImageUrl:
              "https://yt3.ggpht.com/a/AATXAJykMrHHiAKiwhlr4OXPFF0uhvMJ3eetWKx_v2zk=s48-c-k-c0xffffffff-no-rj-mo",
            authorChannelUrl:
              "http://www.youtube.com/channel/UCDDMIY_PWGXa0Y68p-5tVoQ",
            authorChannelId: {
              value: "UCDDMIY_PWGXa0Y68p-5tVoQ",
            },
            canRate: true,
            viewerRating: "none",
            likeCount: 25,
            publishedAt: "2020-07-18T10:54:11Z",
            updatedAt: "2020-07-18T10:54:11Z",
          },
        },
        canReply: true,
        totalReplyCount: 3,
        isPublic: true,
      },
    },
    {
      kind: "youtube#commentThread",
      etag: "wfZd3_qycG0uQ63y90c8UhK7RT8",
      id: "UgwUljF6GYiSCwts_3l4AaABAg",
      snippet: {
        videoId: "-uR-iqh1x1Q",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "EKY4yrqnzW_LpaLzbRdhJsctWns",
          id: "UgwUljF6GYiSCwts_3l4AaABAg",
          snippet: {
            videoId: "-uR-iqh1x1Q",
            textDisplay: "aggressive and dumb title. please try again.",
            textOriginal: "aggressive and dumb title. please try again.",
            authorDisplayName: "Xo1o",
            authorProfileImageUrl:
              "https://yt3.ggpht.com/a/AATXAJwbx5XCNdfwnf5kucJVodoGKgFqvh9THOCols5K=s48-c-k-c0xffffffff-no-rj-mo",
            authorChannelUrl:
              "http://www.youtube.com/channel/UCeMGLGUCZ-otQet4DGRL8SQ",
            authorChannelId: {
              value: "UCeMGLGUCZ-otQet4DGRL8SQ",
            },
            canRate: true,
            viewerRating: "none",
            likeCount: 6,
            publishedAt: "2020-07-18T08:36:04Z",
            updatedAt: "2020-07-18T08:36:04Z",
          },
        },
        canReply: true,
        totalReplyCount: 0,
        isPublic: true,
      },
    },
  ],
};
const repliesResponse = {
  kind: "youtube#commentListResponse",
  etag: "mCDewh3b8pmAJR5ivfwgi-6NkW8",
  pageInfo: {
    resultsPerPage: 12,
  },
  items: [
    {
      kind: "youtube#comment",
      etag: "bbYeDT9yERx5SqfNr4qZd6ibj3Y",
      id: "UgyQOgj_e7mQTILEmpV4AaABAg.9BDxX7Bc2AV9BGT3-yVsYM",
      snippet: {
        textDisplay: "I heard the same from a Kenyan UN worker.",
        textOriginal: "I heard the same from a Kenyan UN worker.",
        parentId: "UgyQOgj_e7mQTILEmpV4AaABAg",
        authorDisplayName: "Roger Vansteenkerke",
        authorProfileImageUrl:
          "https://yt3.ggpht.com/a/AATXAJyunN6aNO4GVdW_KlzoTMdgS9-ihjZT2DiI=s48-c-k-c0xffffffff-no-rj-mo",
        authorChannelUrl:
          "http://www.youtube.com/channel/UCWrYNoF-LPuWIEiAv2v-5ew",
        authorChannelId: {
          value: "UCWrYNoF-LPuWIEiAv2v-5ew",
        },
        canRate: true,
        viewerRating: "none",
        likeCount: 1,
        publishedAt: "2020-07-18T20:04:57Z",
        updatedAt: "2020-07-18T20:04:57Z",
      },
    },
    {
      kind: "youtube#comment",
      etag: "keKXIaXMUlbGjqy7vaaVKXnpo-Y",
      id: "UgyQOgj_e7mQTILEmpV4AaABAg.9BDxX7Bc2AV9BF0lA2y1sf",
      snippet: {
        textDisplay:
          "Lucia Lakpor that is simply not accurate. You do realize a president has to overcome all of the corruption of the last administrators? She is not perfect, but she accomplished a lot as Liberia&#39;s first POST-WAR President. Liberia, had its FIRST peaceful transition of power because of Madame Sirleaf. I am NOT a Weah fan. He is not the brightest, but he is NOT a dictator or warmonger. The voter turnout in 2017 was extremely high. People complain because their individual life did not go from poor to rich, yet fail to look at the long term.  If Liberia can continue to have peaceful transfers of power, WHEN each successive president does something good it won&#39;t be torched to the ground by the next one. Mama Liberia WILL rise.",
        textOriginal:
          "Lucia Lakpor that is simply not accurate. You do realize a president has to overcome all of the corruption of the last administrators? She is not perfect, but she accomplished a lot as Liberia's first POST-WAR President. Liberia, had its FIRST peaceful transition of power because of Madame Sirleaf. I am NOT a Weah fan. He is not the brightest, but he is NOT a dictator or warmonger. The voter turnout in 2017 was extremely high. People complain because their individual life did not go from poor to rich, yet fail to look at the long term.  If Liberia can continue to have peaceful transfers of power, WHEN each successive president does something good it won't be torched to the ground by the next one. Mama Liberia WILL rise.",
        parentId: "UgyQOgj_e7mQTILEmpV4AaABAg",
        authorDisplayName: "Faye Golden",
        authorProfileImageUrl:
          "https://yt3.ggpht.com/a/AATXAJwtivxptlgg0Ij9nYHhmKVLjvt3bC5-mxC_GQ=s48-c-k-c0xffffffff-no-rj-mo",
        authorChannelUrl:
          "http://www.youtube.com/channel/UC0TJyXxohE_t9ICogbWxPOA",
        authorChannelId: {
          value: "UC0TJyXxohE_t9ICogbWxPOA",
        },
        canRate: true,
        viewerRating: "none",
        likeCount: 6,
        publishedAt: "2020-07-18T06:38:28Z",
        updatedAt: "2020-07-18T06:38:28Z",
      },
    },
    {
      kind: "youtube#comment",
      etag: "sGA7CX7oABfrH-Ttgfnjx4BhvXo",
      id: "UgyQOgj_e7mQTILEmpV4AaABAg.9BDxX7Bc2AV9BEJ-I6dGqi",
      snippet: {
        textDisplay:
          "@Sir Surname the First of his Name but what she says defies what she is trying to accomplish.\u003cbr /\u003eIf she is just as bad as men, then she is making a bad example of female leadership.",
        textOriginal:
          "@Sir Surname the First of his Name but what she says defies what she is trying to accomplish.\nIf she is just as bad as men, then she is making a bad example of female leadership.",
        parentId: "UgyQOgj_e7mQTILEmpV4AaABAg",
        authorDisplayName: "-N7-",
        authorProfileImageUrl:
          "https://yt3.ggpht.com/a/AATXAJxiU3Z0qn9vVUc-2zWfXxzb1WQVn_OZTCRkcjPo=s48-c-k-c0xffffffff-no-rj-mo",
        authorChannelUrl:
          "http://www.youtube.com/channel/UCozcjlWa9lLzOPd07SZW5Sw",
        authorChannelId: {
          value: "UCozcjlWa9lLzOPd07SZW5Sw",
        },
        canRate: true,
        viewerRating: "none",
        likeCount: 9,
        publishedAt: "2020-07-17T23:58:35Z",
        updatedAt: "2020-07-17T23:58:35Z",
      },
    },
    {
      kind: "youtube#comment",
      etag: "Ikh2tHHBpAo8KO5agUq2cBOE--Y",
      id: "UgyQOgj_e7mQTILEmpV4AaABAg.9BDxX7Bc2AV9BE3wUjtR0C",
      snippet: {
        textDisplay:
          "Liberia was just as corrupt under her leadership as any previous male leader like Samuel Doe and nothing has changed with George Weah",
        textOriginal:
          "Liberia was just as corrupt under her leadership as any previous male leader like Samuel Doe and nothing has changed with George Weah",
        parentId: "UgyQOgj_e7mQTILEmpV4AaABAg",
        authorDisplayName: "Sir Surname the First of his Name",
        authorProfileImageUrl:
          "https://yt3.ggpht.com/a/AATXAJwQ-0ICNTrAmdD3gIMP3vv2C3byyB-dILsoUg=s48-c-k-c0xffffffff-no-rj-mo",
        authorChannelUrl:
          "http://www.youtube.com/channel/UCG5qB6R85GjtF--vDAJlMgQ",
        authorChannelId: {
          value: "UCG5qB6R85GjtF--vDAJlMgQ",
        },
        canRate: true,
        viewerRating: "none",
        likeCount: 19,
        publishedAt: "2020-07-17T21:46:59Z",
        updatedAt: "2020-07-17T21:46:59Z",
      },
    },
    {
      kind: "youtube#comment",
      etag: "0swmHFNis8b2rHDt1qLUtGtNHU8",
      id: "UgyQOgj_e7mQTILEmpV4AaABAg.9BDxX7Bc2AV9BE1Gxi6d52",
      snippet: {
        textDisplay:
          "Thx for being brave and pointing the truth out. TED has lost it&#39;s way for some time now. All one has to do is believe the opposite of what TED is selling, like this video. TED has been bought out by America&#39;s enemies.",
        textOriginal:
          "Thx for being brave and pointing the truth out. TED has lost it's way for some time now. All one has to do is believe the opposite of what TED is selling, like this video. TED has been bought out by America's enemies.",
        parentId: "UgyQOgj_e7mQTILEmpV4AaABAg",
        authorDisplayName: "Kimberyote3",
        authorProfileImageUrl:
          "https://yt3.ggpht.com/a/AATXAJxWCkyWmSB-_JYNZuv_vcVF3eAIsAJUpI_yYw=s48-c-k-c0xffffffff-no-rj-mo",
        authorChannelUrl:
          "http://www.youtube.com/channel/UC7C_aQfnF6ORz6s6MqG_33Q",
        authorChannelId: {
          value: "UC7C_aQfnF6ORz6s6MqG_33Q",
        },
        canRate: true,
        viewerRating: "none",
        likeCount: 30,
        publishedAt: "2020-07-17T21:23:42Z",
        updatedAt: "2020-07-17T21:23:42Z",
      },
    },
  ],
};

export {
  videoId,
  commentId,
  channelId,
  commentErrorResponse,
  commentDisabledErrorResponse,
  addedCommentResponse,
  commentsResponse,
  repliesResponse,
};
