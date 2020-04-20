import express, { Application, Request, Response } from 'express';
import { Server } from 'http';

import bodyParser from 'body-parser';
import cacheControl from 'express-cache-controller';
import chalk from 'chalk';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import api from '../routes';
import path from 'path';

class ExpressServer {
  // server | api instance
  private app: Application = express();
  private server: Server = new Server(this.app);

  public run(): void {
    const { PORT: port } = process.env;

    this.app.get('/', (req: Request, res: Response) => {
      res.send('Welcome on your app root endpoint ! Try to get /api now :)');
    });

    this.app.use(cors({
      origin: '*', // after change to url website
      credentials: true,
    }));
    this.app.use(helmet());
    this.app.use(cacheControl({ noCache: true }));
    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));
    this.app.use(passport.initialize());
// Swagger set up
    const options = {
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'Urgence API  - Documentation',
          description: 'Api Urgence 🙃',
          version: '1.0.0',
        },
        servers: [
          {
            url: `http://localhost:${process.env.PORT || 8080}/api/`,
          },
        ],
      },
      apis: [path.resolve(__dirname, '../controllers/UsersController.ts')],
    };
    const specs = swaggerJsdoc(options);
    this.app.use('/doc', swaggerUi.serve);
    this.app.get(
      '/docs',
      swaggerUi.setup(specs, {
        explorer: true,
      }),
    );
    this.app.use('/api', api);

    this.server.listen(port, () => {
      console.log(
        chalk.bold.magenta(`💫  Server is running on http://localhost:${port}`),
      );
    });
  }
}

export default Object.freeze(new ExpressServer());
