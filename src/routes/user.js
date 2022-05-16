const express = require("express");
const router = express.Router();
const UserService = require("../services/userService");
const UserServiceInstance = new UserService();
const createError = require("http-errors");

/**
 * @swagger
 * /api/user/profile:
 *  put:
 *    summary: Update a user profile.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *    responses:
 *      '200':
 *        description: An object of user data.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 *      '401':
 *        description: Unauthorized error.
 */
router.put("/profile", async (req, res, next) => {
  try {
    if (!req.user) {
      throw createError(401, "Please log in.");
    }
    const data = req.body;
    const response = await UserServiceInstance.updateProfile({
      ...data,
      id: req.user.id,
    });
    res.send(response);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/user/password:
 *  put:
 *    summary: Update a user password.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: An object of user data.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 *      '401':
 *        description: Unauthorized error.
 */
router.put("/password", async (req, res, next) => {
  try {
    if (!req.user) {
      throw createError(401, "Please log in.");
    }
    const data = req.body;
    const response = await UserServiceInstance.updatePassword({
      ...data,
      id: req.user.id,
    });
    res.send(response);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/user:
 *  get:
 *    summary: Get a user data by id if a user logged in.
 *    responses:
 *      '200':
 *        description: An object of user data.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 */
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      res.send({});
    } else {
      const response = await UserServiceInstance.getUserById(req.user.id);
      res.send(response);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/user:
 *  delete:
 *    summary: Delete a user.
 *    responses:
 *      '200':
 *        description: An object of user data.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 */
router.delete("/", async (req, res, next) => {
  try {
    if (!req.user) {
      throw createError(401, "Please log in.");
    }

    const response = await UserServiceInstance.deleteUser(req.user.id);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The user ID.
 *          example: 1
 *        email:
 *          type: string
 *          description: Email address.
 *          example: hanako@example.com
 *        password:
 *          type: string
 *          description: Hashed password.
 *        created_at:
 *          type: string
 *          description: Timestamp created at first.
 *          example: 2022-05-11 14:28:34.436
 */
