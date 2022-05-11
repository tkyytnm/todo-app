const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("../models/user");
const UserModelInstance = new UserModel();
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
          const user = await UserModelInstance.findUserByEmail(email);
          if (!user) {
            return cb(null, false, { message: "Emailまたはパスワードが間違っています。" });
          }

          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            return cb(null, false, { message: "Emailまたはパスワードが間違っています。" });
          }

          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      }
    )
  );
};
