const express = require("express");
const router = express.Router();
const ToDoService = require("../services/todoService");
const ToDoServiceInstance = new ToDoService();
const createError = require("http-errors");

/**
 * @swagger
 * /api/todo/:
 *  get:
 *    summary: Returns ToDos array by user ID.
 *    responses:
 *      '200':
 *        description: Array of ToDos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ToDo'
 *      '401':
 *        description: Unauthorized error.
 *
 */
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      throw createError(401, "Please log in.");
    }
    const response = await ToDoServiceInstance.fetchToDosByUser(req.user.id);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/todo:
 *  post:
 *    summary: Create a ToDo.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              body:
 *                type: string
 *    responses:
 *      '201':
 *        description: Created and return object.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ToDo'
 *      '401':
 *        description: Unauthorized error.
 */
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      throw createError(401, "Please log in.");
    }
    const data = req.body;
    const response = await ToDoServiceInstance.createToDo({
      ...data,
      user_id: req.user.id,
    });
    res.status(201).send(response);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/todo:
 *  put:
 *    summary: Update a ToDo.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              body:
 *                type: string
 *              completed:
 *                type: boolean
 *    responses:
 *      '200':
 *        description: Updated and return object.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ToDo'
 *      '401':
 *        description: Unauthorized error.
 */
router.put("/", async (req, res, next) => {
  try {
    if (!req.user) {
      throw createError(401, "Please log in.");
    }
    const data = req.body;
    const response = await ToDoServiceInstance.updateToDo(data);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/todo/{id}:
 *  delete:
 *    summary: Delete a ToDo.
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the ToDo.
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Deleted and return object.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ToDo'
 *    '401':
 *        description: Unauthorized error.
 */
router.delete("/:id", async (req, res, next) => {
  try {
    if (!req.user) {
      throw createError(401, "Please log in.");
    }
    const { id } = req.params;
    const response = await ToDoServiceInstance.deleteToDo(id);
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
 *    ToDo:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        user_id:
 *          type: integer
 *          example: 1
 *        body:
 *          type: string
 *          example: Drink water.
 *        created_at:
 *          type: string
 *          example: 2022-05-11 15:57:44.281
 *        completed:
 *          type: boolean
 *          example: true
 */
