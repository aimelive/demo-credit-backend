import responses from "../responses.doc";

export const account = {
  // @ts-ignore
  "/account/details": {
    get: {
      tags: ["Account"],
      summary: "Account details",
      description: "Getting account details such as balance etc.",
      operationId: "getAccountDetails",
      security: [
        {
          JWT: [],
        },
      ],
      responses,
    },
  },
  //@ts-ignore
  "/account/deposit": {
    post: {
      tags: ["Account"],
      summary: "Deposit Amount",
      description: "Deposit amount of money to an account",
      operationId: "postAccountDeposit",
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          name: "body",
          in: "body",
          description: "Deposit amount to an account",
          required: true,
          schema: {
            $ref: "#/definitions/deposit",
          },
        },
      ],
      responses,
    },
  },
  //@ts-ignore
  "/account/withdraw": {
    post: {
      tags: ["Account"],
      summary: "withdraw Amount",
      description: "Withdraw amount of money from an account",
      operationId: "postAccountWithdraw",
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          name: "body",
          in: "body",
          description: "Withdraw amount from an account",
          required: true,
          schema: {
            $ref: "#/definitions/withdraw",
          },
        },
      ],
      responses,
    },
  },
  //@ts-ignore
  "/account/transfer/:to_account": {
    post: {
      tags: ["Account"],
      summary: "Transfer Amount",
      description: "Transfer amount of money from an account to another",
      operationId: "postAccountTransfer",
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          name: "to_account",
          in: "path",
          description: "Account Id where money is going to be transfered",
          require: true,
        },
        {
          name: "body",
          in: "body",
          description: "Transfer amount from an account to another",
          required: true,
          schema: {
            $ref: "#/definitions/transfer",
          },
        },
      ],
      responses,
    },
  },
};
const amount = { type: "number", required: true, default: 4500 };
export const accountDefinitions = {
  deposit: {
    type: "object",
    properties: {
      amount,
    },
  },
  withdraw: {
    type: "object",
    properties: {
      amount,
    },
  },
  transfer: {
    type: "object",
    properties: {
      amount,
    },
  },
};
