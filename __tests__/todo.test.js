const app = require("../app");
const db = require("../src/db");
const request = require("supertest");
const { faker } = require("@faker-js/faker");

const user = {
  id: null,
  email: faker.internet.email(),
  password: faker.internet.password(),
  cookie: "",
};

afterAll(() => {
  db.end();
});

describe("Test todo routes", () => {
  beforeAll(async () => {
    const res = await request(app).post("/api/auth/register").send(user);
    user.id = res.body.id;
    user.cookie = res.headers["set-cookie"];
  });

  const todo = {
    id: null,
    body: faker.random.words(),
  };

  test("GET /api/todo before create ToDo", async () => {
    const res = await request(app).get("/api/todo").set("cookie", user.cookie);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });

  test("POST /api/todo without cookie", async () => {
    const res = await request(app).post("/api/todo").send(todo);
    todo.id = res.body.id;
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(401);
  });

  test("POST /api/todo", async () => {
    const res = await request(app)
      .post("/api/todo")
      .send(todo)
      .set("cookie", user.cookie);
    todo.id = res.body.id;
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(201);
    expect(res.body.body).toBe(todo.body);
  });

  const newBody = faker.random.words(4);

  test("PUT /api/todo without cookie", async () => {
    const res = await request(app)
      .put("/api/todo")
      .send({ id: todo.id, body: newBody, completed: true });
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(401);
  });

  test("PUT /api/todo", async () => {
    const res = await request(app)
      .put("/api/todo")
      .send({ id: todo.id, body: newBody, completed: true })
      .set("cookie", user.cookie);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(200);
    expect(res.body.body).toBe(newBody);
    expect(res.body.completed).toBe(true);
  });

  test("GET /api/todo without cookie", async () => {
    const res = await request(app).get("/api/todo");
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(401);
  });

  test("GET /api/todo", async () => {
    const res = await request(app).get("/api/todo").set("cookie", user.cookie);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(200);
    expect(res.body[res.body.length - 1].id).toBe(todo.id);
    expect(res.body[res.body.length - 1].body).toBe(newBody);
    expect(res.body[res.body.length - 1].completed).toBe(true);
  });

  test("DELETE /api/todo/:id without cookie", async () => {
    const res = await request(app).delete(`/api/todo/${todo.id}`);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(401);
  });

  test("DELETE /api/todo/:id", async () => {
    const res = await request(app)
      .delete(`/api/todo/${todo.id}`)
      .set("cookie", user.cookie);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(todo.id);
    expect(res.body.user_id).toBe(user.id);
    expect(res.body.body).toBe(newBody);
    expect(res.body.completed).toBe(true);
  });

  afterAll(async () => {
    const res = await request(app)
      .delete("/api/user/")
      .set("cookie", user.cookie);
  });
});
