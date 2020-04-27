import { Request, Response } from 'express';
import axios from 'axios';

export default class HospitalController {
    //private static userRepository: Repository<User>;

    constructor() {
        //  HospitalController.userRepository = getRepository(User);
    }

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
}
