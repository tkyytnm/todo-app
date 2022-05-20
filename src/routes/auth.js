const express = require("express");
const router = express.Router();
const AuthService = require("../services/authService");
const AuthServiceInstance = new AuthService();
const passport = require("passport");
const createError = require("http-errors");

router.get("/login", (req, res, next) => {
  next(createError(401, req.session.messages[req.session.messages.length - 1]));
});

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Login a user.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '201':
 *        description: Login succeeded and return a user object.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/api/auth/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.status(201).send(req.user);
  }
);

/**
 * @swagger
 * /api/auth/logout:
 *  post:
 *    summary: Logout a user.
 *    responses:
 *      '201':
 *        description: Logout succeeded.
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              example: Logged out.
 *      '401':
 *        description: Unauthorized error.
 */
router.post("/logout", (req, res, next) => {
  try {
    if (!req.user) {
      throw createError(401, "Please log in.");
    }
    req.logout();
    res.status(201).send({ message: "Logged out." });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: Register a user.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '201':
 *        description: Register succeeded and return a user object.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '409':
 *        description: When email already exists.
 */
router.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    const user = await AuthServiceInstance.createUser(data);
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      res.status(201).send(user);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
