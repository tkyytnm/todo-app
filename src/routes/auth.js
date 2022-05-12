const express = require("express");
const router = express.Router();
const AuthService = require("../services/authService");
const AuthServiceInstance = new AuthService();
const passport = require("passport");
const createError = require("http-errors");

router.get("/login", (req, res, next) => {
  res.send(req.session.messages);
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
    res.status(201).send("Logged out.");
  } catch (err) {
    throw err;
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
    const response = await AuthServiceInstance.createUser(data);
    res.status(201).send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
