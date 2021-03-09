import passport from 'passport'
import HttpException from '../exceptions/httpException'
import {Request, Response, NextFunction} from 'express'

export function authenticateLocal() {
    return function (req: Request, res: Response, next: NextFunction) {
        passport.authenticate('local', {session: false}, (error, user) => {
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

export function authenticateJWT() {
    return function (req: Request, res: Response, next: NextFunction) {
        passport.authenticate('jwt', {session: false}, (error, userId) => {
            if (error)
                return next(error)

            if (!userId)
                throw new HttpException(401, 'unauthorized')
            else
                req.body.id = userId
            next()
        })(req, res, next)
    }
}