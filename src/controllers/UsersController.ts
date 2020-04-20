import { Request, Response } from 'express';
// import axios from 'axios';
export default class UsersController {

  constructor() {
  }

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all users
   *     description: Returns a list of all the users
   *     tags:
   *       - Users
   *     parameters:
   *        - in: header
   *          name: Authorization
   *          description: Bearer + TOKEN
   *          schema:
   *            type: string
   *            format: token
   *          required: true
   *     responses:
   *       200:
   *         description: List of Users
   *         schema:
   *           type: object
   *           properties:
   *             users:
   *               type: array
   *               description: all the users
   *               items:
   *                 type: string
   */
  static getAll = (request: Request, response: Response) => {
     response.status(200).json('hello')
  };

}
