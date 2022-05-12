const user = require("./user");
const todo = require("./todo");
const auth = require("./auth");

module.exports = (app) => {
  app.use("/api/user", user);
  app.use("/api/todo", todo);
  app.use("/api/auth", auth);
};
