const app = require("../app");
const request = require("supertest");
const db = require("../src/db");
const { faker } = require("@faker-js/faker");

afterAll(() => {
  db.end();
});

const user = {
  id: null,
  email: faker.internet.email(),
  password: faker.internet.password(),
  visibility: true,
  cookie: "",
};

describe("Test auth routes", () => {
  test("GET /api/auth/login", async () => {
    const res = await request(app).get("/api/auth/login");
    expect(res.statusCode).toEqual(200);
  });

  test("POST /api/auth/register", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: user.email, password: user.password });
    user.id = res.body.id;
    user.cookie = res.headers["set-cookie"];
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toEqual(201);
    expect(res.body.email).toEqual(user.email);
    expect(typeof res.body.password).toBe("string");
  });

  test("POST /api/auth/register second time", async () => {
    const res = await request(app).post("/api/auth/register").send(user);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toEqual(409);
  });

  test("POST /api/auth/logout without cookie", async () => {
    const res = await request(app).post("/api/auth/logout");
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toEqual(401);
  });

  test("POST /api/auth/logout", async () => {
    const res = await request(app)
      .post("/api/auth/logout")
      .set("Cookie", user.cookie);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toEqual(201);
    expect(res.text).toMatch(/Logged out./);
  });

  test("POST /api/auth/login", async () => {
    const res = await request(app).post("/api/auth/login").send(user);
    user.cookie = res.headers["set-cookie"];
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toEqual(201);
    expect(res.body.email).toEqual(user.email);
    expect(typeof res.body.password).toBe("string");
  });

  afterAll(async () => {
    const res = await request(app)
      .delete("/api/user/")
      .set("Cookie", user.cookie);
  });
});
