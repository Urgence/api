import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt';

passport.use(
  'JwtStrategy',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.jwtSecret as string}`,
    },
    async (jwtPayload, next: VerifiedCallback) => {
      if (jwtPayload.admin === true) {
        return next(undefined, jwtPayload);
      } else {
        return next('User  doesn\'t exist', undefined);
      }
    },
  ),
);
export default passport;
