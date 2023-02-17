import dotenv from "dotenv";
import { account, accountDefinitions } from "./api/account.doc";
import { transactions } from "./api/transactions.doc";
import { user, userDefinitions } from "./api/user.doc";

dotenv.config();

const paths = {
  ...user,
  ...account,
  ...transactions,
};

const definitions = {
  ...userDefinitions,
  ...accountDefinitions,
};

const host =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL?.split("https://")[1]
    : process.env.BASE_URL?.split("http://")[1];

const config = {
  swagger: "2.0",
  info: {
    title: "Demo Credit API",
    version: "1.0.0",
    description:
      "Demo Credit App is a micro-wallet app which helps to transfer money between two end parties",
  },
  host,
  basePath: "/api/v1",
  schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"],
  securityDefinitions: {
    JWT: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  paths,
  definitions,
};

export default config;
