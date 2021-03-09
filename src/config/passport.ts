import passport from 'passport'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import {User} from '../models/userModel'
import {UserService} from '../services/userService'

const JWT_SECRET = process.env.JWT_SECRET ?? ''

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const userService: UserService = new UserService()
            const user: User | null = await userService.getOneByEmail(email)

            if (!user) {
                return done(null, false, {message: 'Invalid email'})
            }

            const checkPassword = await userService.validatePassword(user, password)

            if (checkPassword)
                return done(null, user)
            else
                return done(null, false, {message: 'Invalid password'})
        } catch (error) {
            return done(error)
        }
    })
)

passport.use(new JwtStrategy(
    {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
    },
    (jwtToken, done) => done(null, jwtToken.id))
)

export default passport
