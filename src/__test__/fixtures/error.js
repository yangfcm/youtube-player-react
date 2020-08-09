export const error = {
  response: {
    data: {
      error: {
        code: 400,
        message:
          "No filter selected. Expected one of: managedByMe, id, forUsername, mySubscribers, mine, categoryId",
        errors: [
          {
            message:
              "'No filter selected. Expected one of: managedByMe, id, forUsername, mySubscribers, mine, categoryId'",
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
