import { ExtractJwt, Strategy as JwtStrategy, type StrategyOptions } from "passport-jwt";
import {prisma} from '../../lib/prisma.js';
import passport from "passport";

export interface JwtPayload {
    username: string;
    iat?: number;
    exp?: number;
}

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY || 'fallback'
};

passport.use(new JwtStrategy(options, async (jwtPayload: JwtPayload, done) => {
    try{
        const user = await prisma.users.findUnique({
            where: {username: jwtPayload.username}
        });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'authentication failed'});
        }
        } catch (error) {
        return done(error, false);
        }
}));

export default passport;