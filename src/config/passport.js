import passport from "passport";
import jwt from 'passport-jwt';
import config from "./config.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), 
        secretOrKey: config.privateKeyJWT
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload.user) 
        } catch (error) {
            return done(error);
        }
    }))

};

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies['TokenJWT'];
    }
    return token;
}

export default initializePassport;