import passport from 'passport'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import {User} from '../models/userModel'
import {JWT_SECRET} from '../util/secrets'
import {UserService} from "../services/userService";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(new LocalStrategy(
    {usernameField: 'email'},
    async (email, password, done) => {
        try {
            const userService: UserService = new UserService()
            const user: User = await userService.findUser(email)

            if (!user)
                return done(null, false, {message: 'Invalid email'})

            const checkPassword = await user.validatePassword(password)

            if (checkPassword)
                return done(null, user)
            else
                return done(null, false, {message: 'Invalid password'})
        } catch (error) {
            return done(error)
        }
    })
)

// passport.use(new JwtStrategy(
//     {
//     jwtFromRequest: ExtractJwt.fromAuthHeader(),
//     secretOrKey: JWT_SECRET
//     },
//     async (jwtToken, done) => {
//         try {
//             const user: User = User.findOne({
//                 where: {email: jwtToken.email}
//             })
//
//             if (user)
//                 return done(null, user, jwtToken)
//             else
//                 return done(null, false)
//
//         } catch (error) {
//             return done(error)
//         }
//     })
// )
