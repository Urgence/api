import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entities';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { sendMail } from '../lib/Mailer';
import { toLower } from 'lodash';


export default class AuthController {
    private static userRepository: Repository<User>;

    constructor() {
        AuthController.userRepository = getRepository(User);
    }

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Login
     *     description: for login user
     *     tags:
     *       - Auth
     *     parameters:
     *      - in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *              email:
     *                  type: string
     *              password:
     *                  type: string
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Bad Request
     *       401:
     *         description: Unauthorized
     *
     */
    static login = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        return passport.authenticate(
            'locale',
            { session: false },
            async (err: Error, user: User) => {
                if (err) {
                    return response.status(400).json({ error: err });
                }
                const { uuid, email, firstName, lastName } = await user;
                const token = jwt.sign(
                    { uuid, email, firstName, lastName },
                    `${process.env.jwtSecret as string}`,
                );
            },
        )(request, response);
    };

    static checkPassword = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        let { email } = request.body;
        email = toLower(email);
        return await getRepository(User)
            .findOneOrFail({ where: { email } })
            .then(async (user: User) => {
                const token = jwt.sign(
                    { uuid: user.uuid, email: user.email },
                    `${process.env.jwtSecret as string}`,
                    { expiresIn: '2h' },
                );
                return await sendMail(
                    user,
                    'Changing your password',
                    `
<p>Hello ${user.firstName} ${user.lastName}, to change your password please click on the link </p>
<a type="button" href="http://localhost:4200/#/changePassword?token=${token}">Click  </a>
 `,
                )
                    .then(() => {
                        return response
                            .json({ status: 'true', meta: { token } })
                            .status(200);
                    })
                    .catch((error: Error) => {
                        return response
                            .json({ message: 'email invalid  ', error })
                            .status(500);
                    });
            })
            .catch(() => {
                return response.status(404).json('email not in bdd');
            });
    };

    static ChangePassword = async (request: Request): Promise<void> => {
        console.log(request.params.id);
    };
}
