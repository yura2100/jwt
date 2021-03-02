import {Request, Response, NextFunction} from 'express'
import {User} from '../models/userModel'
import {JWT_SECRET} from '../util/secrets'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import HttpException from '../exceptions/httpException'
import {UserService} from '../services/userService'

export class UserController {
    // private readonly userService: UserService
    //
    // constructor() {
    //     this.userService = new UserService()
    // }

    async getUser(req: Request, res: Response): Promise<void> {
        const email: string = req.body.email

        const userService = new UserService()

        const user: User = await userService.findUser(email)
    }

    async registerUser(req: Request, res: Response): Promise<void> {
        const {email, name, password} = req.body

        try {
            const userService = new UserService()

            const user: User = await userService.addUser(email, name, password)

            res.status(200).send({user: user.toAuthJSON()})
        } catch (error) {
            throw new HttpException(401, error.message)
        }
    }

    authenticateUser(req: Request, res: Response, next: NextFunction): void {
        passport.authenticate('local', (error, user) => {
            if (error)
                return next(error)

            if (!user) {
                throw new HttpException(401, 'unauthorized')
            } else {
                const token = jwt.sign(user, JWT_SECRET)

                res.status(200).send({user, token})
            }
        })
    }
}

export default new UserController()

