import { Router } from 'express';
import { HospitalController } from '../controllers';

const api = Router();

api.get('/', HospitalController.getAllHospital);


export default api;
