import { UsersController } from '../controllers';
import { Router } from 'express';

const api = Router();

api.get('/', UsersController.getAll);

export default api;
