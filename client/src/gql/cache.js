import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projexts: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
