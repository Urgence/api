import { Request, Response } from 'express';
import axios from 'axios';

export default class HospitalController {
    //private static userRepository: Repository<User>;

    constructor() {
        //  HospitalController.userRepository = getRepository(User);
    }

    /**
     * @swagger
     * /hospital:
     *   get:
     *     summary: Get All hospital
     *     description: Returns a list of hospital
     *     tags:
     *       - Hospital
     *     responses:
     *       200:
     *         description: List of Hospital
     *         schema:
     *           type: object
     *           properties:
     *             users:
     *               type: array
     *               description: all the Hospital
     *               items:
     *                 type: string
     */
    static getAllHospital = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        return axios.get(process.env.API_HOSPITAL_URL as string).then(result => {
            return response.json(result.data).status(200);
        }).catch(err => {
            return response.json(err).status(400);
        });
    };

    /**
     * @swagger
     * /hospital/location:
     *   post:
     *     summary: Get All hospital near location
     *     description: Returns a list of hospital near location
     *     tags:
     *       - Hospital
     *     parameters:
     *      - in body:
     *        name: latitude
     *        example: 2.369794931389816
     *        type: string
     *      - in body:
     *        name: longitude
     *        example: 48.7741237334045
     *        type: string
     *     responses:
     *       200:
     *         description: List of Hospital
     *         schema:
     *           type: object
     *           properties:
     *             hospital:
     *               type: array
     *               description: all the Hospital
     *               items:
     *                 type: string
     */
    static getHospitalByGeoCode = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const { latitude, longitude } = request.body;
        return axios.get(`${process.env.API_HOSPITAL_URL as string}&geofilter.distance=${longitude}%2C+${latitude}%2C+1000`).then(result => {
            return response.json(result.data).status(200);
        }).catch(err => {
            return response.json(err).status(400);
        });
    };
}
