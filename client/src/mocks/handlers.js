import { rest } from "msw";

const user = {
  id: 34,
  email: "hanako@example.com",
  password: "pass",
  created_at: "2022-05-11, 14:28:34.436",
};

const toDos = [
  {
    id: 1,
    user_id: 34,
    body: "Drink water.",
    created_at: "2022-05-11 15:57:44.281",
    completed: false,
  },
  {
    id: 2,
    user_id: 34,
    body: "Take lunch.",
    created_at: "2022-05-11 15:57:44.281",
    completed: false,
  },
  {
    id: 3,
    user_id: 22,
    body: "Work.",
    created_at: "2022-05-11 15:57:44.281",
    completed: true,
  },
];

export const handlers = [
  rest.post("/api/auth/login", (req, res, ctx) => {
    if (req.body.email === user.email && req.body.password === user.password) {
      return res(ctx.json(user), ctx.delay(150));
    }
    return res(
      ctx.json({ message: "Emailまたはパスワードが間違っています。" }),
      ctx.delay(150)
    );
  }),
  rest.get("/api/todo", (req, res, ctx) => {
    return res(ctx.json(toDos), ctx.delay(150));
  }),
];
