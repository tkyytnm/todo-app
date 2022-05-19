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

describe("Test user routes", () => {
  beforeAll(async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: user.email, password: user.password });
    user.id = res.body.id;
    user.cookie = res.headers["set-cookie"];
  });

  test("GET /api/user without cookie", async () => {
    const res = await request(app).get("/api/user");
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({});
  });

  test("GET /api/user", async () => {
    const res = await request(app).get("/api/user").set("Cookie", user.cookie);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(user.id);
    expect(res.body.email).toBe(user.email);
    expect(typeof res.body.password).toBe("string");
  });

  const newEmail = faker.internet.email();

  test("PUT /api/user/profile without cookie", async () => {
    const res = await request(app)
      .put("/api/user/profile")
      .send({ email: newEmail });
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(401);
  });

  test("PUT /api/user/profile", async () => {
    const res = await request(app)
      .put("/api/user/profile")
      .set("Cookie", user.cookie)
      .send({ email: newEmail });
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(newEmail);
  });

  const newPassword = faker.internet.password();

  test("PUT /api/user/password without cookie", async () => {
    const res = await request(app)
      .put("/api/user/password")
      .send({ password: newPassword });
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(401);
  });

  test("PUT /api/user/password", async () => {
    const res = await request(app)
      .put("/api/user/password")
      .set("Cookie", user.cookie)
      .send({ password: newPassword });
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(200);
    expect(typeof res.body.password).toBe("string");
  });

  test("PUT /api/user/visibility", async () => {
    const res = await request(app)
      .put("/api/user/visibility")
      .set("Cookie", user.cookie)
      .send({ visibility: !user.visibility });
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(200);
    expect(res.body.visibility).toBe(!user.visibility);
  });

  test("DELETE /api/user without cookie", async () => {
    const res = await request(app).delete("/api/user/");
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toEqual(401);
  });

  test("DELETE /api/user", async () => {
    const res = await request(app)
      .delete("/api/user/")
      .set("Cookie", user.cookie);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toEqual(200);
    expect(res.body.email).toEqual(newEmail);
    expect(typeof res.body.password).toBe("string");
  });
});
