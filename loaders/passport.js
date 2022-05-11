const passport = require("passport");
const LocalStrategy = require("passport-local");
const userModel = require("../models/user");
const userModelInstance = new userModel();
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.use(passport.authenticate("session"));

  passport.serializeUser((user, cb) => {
    process.nextTick(() => {
      cb(null, { id: user.id, email: user.email });
    });
  });

  passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
      return cb(null, user);
    });
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, cb) => {
        try {
          const user = await userModelInstance.findUserByEmail(email);
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          }

          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            return cb(null, false, { message: "Incorrect email or password." });
          }

          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      }
    )
  );
};
