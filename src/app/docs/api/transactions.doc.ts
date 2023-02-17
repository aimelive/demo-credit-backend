import responses from "../responses.doc";

export const transactions = {
  // @ts-ignore
  "/transactions": {
    get: {
      tags: ["Transactions"],
      summary: "Account transactions",
      description: "Getting all transactions made by the current use logged in",
      operationId: "getTransactions",
      security: [
        {
          JWT: [],
        },
      ],
      responses,
    },
  },
  //@ts-ignore
  "/transactions/:id": {
    post: {
      tags: ["Transactions"],
      summary: "Special transaction information by its Id",
      description: "Transaction details",
      operationId: "getTransactionsDetails",
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Transaction Id",
          require: true,
        },
      ],
      responses,
    },
  },
};
