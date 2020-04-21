import express, { Application, Request, Response } from 'express';
import { Server } from 'http';
import chalk from 'chalk';

import api from '../routes';
import { Middlewares } from './middlewares';
import { createConnection } from 'typeorm';

class ExpressServer {
    // server | api instance
    private app: Application = express();
    private server: Server = new Server(this.app);

    public run(): void {
        const { PORT: port } = process.env;
        createConnection('default')
            .then(async () => {
                this.app.get('/', (req: Request, res: Response) => {
                    res.send('Welcome on your app root endpoint ! Try to get /api now :)');
                });
                Middlewares(this.app);
                this.app.use('/api', api);

                this.server.listen(port, () => {
                    console.log(
                        chalk.bold.magenta(`💫  Server is running on http://localhost:${port}`),
                    );
                });
            })
            .catch(error => {
                console.log(error.message);
                return error;
            });
    }
}

export default Object.freeze(new ExpressServer());
