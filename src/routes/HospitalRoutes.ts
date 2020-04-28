import { Router } from 'express';
import { HospitalController } from '../controllers';

const api = Router();

api.get('/', HospitalController.getAllHospital);
api.post('/location', HospitalController.getHospitalByGeoCode);


export default api;
