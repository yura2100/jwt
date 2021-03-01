import {Request, Response, NextFunction} from 'express'
import {PassportStatic} from 'passport'
import '../auth/passportHandler'

export class AuthController {
    private passport: PassportStatic

    constructor(passport: PassportStatic) {
        this.passport = passport
    }

    public authenticateJWT(req: Request, res: Response, next: NextFunction) {
        this.passport.authenticate('jwt', (err, user) => {
            if (err) {
                return res.status(401).json({status: 'error', code: 'unauthorized'})
            }

            if (!user) {
                return res.status(401).json({status: 'error', code: 'unauthorized'})
            } else {
                return next()
            }
        })(req, res, next)
    }

    public authorizeJWT(req: Request, res: Response, next: NextFunction) {
        this.passport.authenticate('jwt', (err, user, jwtToken) => {
            if (err) {
                return res.status(401).json({status: 'error', code: 'unauthorized'})
            }

            if (!user) {
                return res.status(401).json({status: 'error', code: 'unauthorized'})
            } else {
                const scope = req.baseUrl.split("/").slice(-1)[0]
                const authScope = jwtToken.scope

                if (authScope && authScope.indexOf(scope) > -1) {
                    return next()
                } else {
                    return res.status(401).json({status: 'error', code: 'unauthorized'})
                }
            }
        })(req, res, next)
    }
}
