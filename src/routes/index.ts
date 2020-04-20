import { Request, Response, Router } from 'express';
import passport from '../middlewares/passport';
import verifyToken from '../middlewares/verifyToken';

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

export default api;
