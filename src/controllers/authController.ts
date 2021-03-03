import passport from 'passport'
import HttpException from '../exceptions/httpException'
import {Request, Response, NextFunction} from 'express'

export function authenticate(strategy: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        passport.authenticate(strategy, {session: false}, (error, user) => {
            if (error)
                return next(error)

            if (!user)
                throw new HttpException(401, 'unauthorized')
            else
                req.user = user
                next()
        })(req, res, next)
    }
}