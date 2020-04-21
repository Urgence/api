import { Application } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cacheControl from 'express-cache-controller';
import cors from 'cors';
import passport from 'passport';
import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export const Middlewares = (app: Application): void => {
    app.use(
        cors({
            origin: '*', // after change to url website
            credentials: true,
        }),
    );
    app.use(helmet());
    app.use(passport.initialize());
    app.use(cacheControl({ noCache: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
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
        apis: [path.resolve(__dirname, '../controllers/*')],
    };
    const specs = swaggerJsdoc(options);
    app.use('/docs', swaggerUi.serve);
    app.get(
        '/docs',
        swaggerUi.setup(specs, {
            explorer: true,
        }),
    );
};
