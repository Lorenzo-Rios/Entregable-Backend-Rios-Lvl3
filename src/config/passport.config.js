import passport from 'passport'
import jwt from 'passport-jwt'
import { configObjet } from '../server/connection.db.js'

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt


const initializePassport = () => {

    const cookieExtractor = (req) => {
        let token = null;
    
        if (req && req.signedCookies) {
            token = req.signedCookies['token']; 
        }
        return token;
    };

    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: configObjet.private_key
            },
            async (jwt_payload, done) => {
                try {
                    // Si el token es válido, continúa
                    return done(null, jwt_payload);
                } catch (error) {
                    // Manejo explícito de errores
                    return done(null, false, { message: 'Token inválido o no proporcionado.' });
                }
            }
        )
    );

}

export {
    initializePassport
}