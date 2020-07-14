export const error = {
  response: {
    data: {
      error: {
        code: 401,
        message:
          "The request uses the \u003ccode\u003emine\u003c/code\u003e parameter but is not properly authorized.",
        errors: [
          {
            message:
              "The request uses the \u003ccode\u003emine\u003c/code\u003e parameter but is not properly authorized.",
            domain: "youtube.parameter",
            reason: "authorizationRequired",
          },
        ],
      },
    },
  },
};
