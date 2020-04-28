import { Router } from 'express';
import { HospitalController } from '../controllers';

const api = Router();

api.get('/', HospitalController.getAllHospital);
api.post('/location', HospitalController.getHospitalByGeoCode);
api.post('/search', HospitalController.searchHospital);


export default api;
