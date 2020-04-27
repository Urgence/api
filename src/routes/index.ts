import { Request, Response, Router } from 'express';
import UsersRoutes from './UserRoutes';
import AuthRoutes from './AuthRoutes';
import HospitalRoutes from './HospitalRoutes';

const api = Router();

api.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    name: 'Urgence API',
    version: '1.0.0',
    documentation: 'go to endpoint \'/docs\'',
  });
});

// create any subroute you'd like with
// api.use('/mysubroute', mysubroutefile)
api.use('/user', UsersRoutes);
api.use('/auth', AuthRoutes);
api.use('/hospital', HospitalRoutes);
export default api;
