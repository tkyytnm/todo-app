const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const { SECRET } = require("../config").SESSION;
const db = require("../db");

module.exports = (app) => {
  app.use(morgan("dev"));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: SECRET,
      resave: false,
      saveUninitialized: false,
      store: new (require("connect-pg-simple")(session))({
        pool: db,
      }),
      cookie: { maxAGE: 30 * 24 * 60 * 60 * 1000 },
    })
  );
};
