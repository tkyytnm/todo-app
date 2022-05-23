const request = require("supertest");
const app = require("../app");
const db = require("../src/db");

afterAll(() => {
  db.end();
});

describe("Test home", () => {
  test("responds to /api", async () => {
    const res = await request(app).get("/api");
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Hello World!");
  });
});