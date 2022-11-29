import { describe, expect, test } from "@jest/globals";
import app from "../index";
import request from "supertest";

let token = "";

beforeAll(async () => {
  const response = await request(app).post("/api/v1/users/login").send({
    email: "aimendayambaje24@gmail.com",
    password: "aimelive123",
  });
  token = response.body.data.token;
});

describe("ROUTE /users", () => {
  describe("POST /login - Login by using email and password", () => {
    test("login successfully", async () => {
      const response = await request(app).post("/api/v1/users/login").send({
        email: "aimendayambaje24@gmail.com",
        password: "aimelive123",
      });
      expect(response.statusCode).toBe(200);
    });

    test("user not exist", async () => {
      const response = await request(app).post("/api/v1/users/login").send({
        email: "nouserexist@gmail.com",
        password: "aimelive123",
      });
      expect(response.statusCode).toBe(404);
    });

    test("email is invalid", async () => {
      const response = await request(app).post("/api/v1/users/login").send({
        email: "invalid-email",
        password: "aimelive123",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("POST /register - Sign up new user", () => {
    test("should contain email exists in the body", async () => {
      const response = await request(app).post("/api/v1/users/register").send({
        fullname: "prince",
        username: "aimelive",
        email: "aimendayambaje24@gmail.com",
        role: "lender",
        password: "aimelive123",
      });
      expect(response.body.message).toContain("exists");
    });
    test("email is missing", async () => {
      const response = await request(app).post("/api/v1/users/register").send({
        fullname: "prince",
        username: "aimelive",
        role: "lender",
        password: "aimelive123",
      });
      expect(response.body.message).toContain("email is required");
    });
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/api/v1/users/register").send({
        fullname: "prince",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
  describe("GET /users - getting all users", () => {
    test("should contain 'User not logged in' in the response body", async () => {
      const resp = await request(app).get("/api/v1/users");
      expect(resp.body.message).toContain("User not logged in");
    });
    test("response has users data", async () => {
      const resp = await request(app)
        .get("/api/v1/users")
        .set("Authorization", `Bearer ${token}`);
      expect(resp.body.data).toBeDefined();
    });
    test("invalid token", async () => {
      const resp = await request(app)
        .get("/api/v1/users")
        .set("Authorization", `Bearer khbsjsl`);
      expect(resp.body.data).toBeUndefined();
    });
  });
});
describe("ROUTE /account", () => {
  describe("GET /view details", () => {
    test("should contain account data", async () => {
      const response = await request(app)
        .get("/api/v1/account/details")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("POST /deposit", () => {
    test("response should contain 500 USD deposited", async () => {
      const response = await request(app)
        .post("/api/v1/account/deposit")
        .send({ amount: 500 })
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.message).toContain("500 USD deposited");
    });
  });

  describe("POST /withdraw", () => {
    test("withdrawn successfully", async () => {
      const response = await request(app)
        .post("/api/v1/account/withdraw")
        .send({ amount: 500 })
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
    test("insufficient fund", async () => {
      const response = await request(app)
        .post("/api/v1/account/withdraw")
        .send({ amount: 5000 * 1000 })
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.message).toContain("insufficient fund");
    });
  });

  describe("POST /transfer", () => {
    test("invalid transaction account", async () => {
      const response = await request(app)
        .post("/api/v1/account/transfer/da28c4ac-590e-47aa-b368-8993bc1be823")
        .send({ amount: 500 })
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.message).toContain("account does not exist");
    });
  });
});

describe("GET / - getting all transactions", () => {
  test("should respond a 200 status code", async () => {
    const response = await request(app)
      .get("/api/v1/transactions")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});
