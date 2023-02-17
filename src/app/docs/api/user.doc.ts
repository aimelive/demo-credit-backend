import responses from "../responses.doc";

export const user = {
  // @ts-ignore
  "/users/register": {
    post: {
      tags: ["User"],
      summary: "Create User",
      description: "Create a new user account",
      operationId: "postUsersRegister",
      parameters: [
        {
          name: "body",
          in: "body",
          description: "Create a new user account",
          required: true,
          schema: {
            $ref: "#/definitions/register",
          },
        },
      ],
      responses,
    },
  },
  // @ts-ignore
  "/users/login": {
    post: {
      tags: ["User"],
      summary: "Login",
      description: "Login a user",
      operationId: "postUsersLogin",
      parameters: [
        {
          name: "body",
          in: "body",
          description: "Login a user",
          required: true,
          schema: {
            $ref: "#/definitions/login",
          },
        },
      ],
      responses,
    },
  },
  //@ts-ignore
  "/users": {
    get: {
      tags: ["User"],
      summary: "All Users",
      description: "Get all users and accounts info",
      operationId: "getUsersUser",
      security: [
        {
          JWT: [],
        },
      ],
      responses,
    },
  },
};

export const userDefinitions = {
  register: {
    type: "object",
    properties: {
      fullname: {
        type: "string",
        required: true,
        default: "Aime Ndayambaje",
      },
      username: {
        type: "string",
        required: true,
        default: "Aimelive",
      },
      email: {
        type: "string",
        required: true,
        default: "aimendayambaje25@gmail.com",
      },
      role: {
        type: "string",
        required: true,
        default: "lender",
      },
      password: {
        type: "string",
        required: true,
        default: "aimelive@123",
      },
    },
  },

  login: {
    type: "object",
    properties: {
      email: {
        type: "string",
        required: true,
        default: "aimendayambaje25@gmail.com",
      },
      password: {
        type: "string",
        required: true,
      },
    },
  },
};
