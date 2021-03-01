import {Request, Response, NextFunction} from 'express'
import {IUser, User} from '../models/userModel'
import bcrypt from 'bcrypt'
import {JWT_SECRET} from '../util/secrets'
import jwt from 'jsonwebtoken'
import {PassportStatic} from 'passport'

export class UserController {
    private user: User
    private passport: PassportStatic

    constructor(user: User, passport: PassportStatic) {
        this.user = user
        this.passport = passport
    }

    async getUser(req: Request, res: Response): Promise<void> {
        const email: string = req.body.email

        const user: IUser = await this.user.find({
            email: email
        })
    }

    async registerUser(req: Request, res: Response): Promise<void> {
        const {email, name, password} = req.body

        try {
            const hash: string = await bcrypt.hash(password, 10)

            const user: IUser = await this.user.create({
                email: email,
                name: name,
                password: hash
            })

            const token = jwt.sign({email: email, scope: req.body.scope}, JWT_SECRET)

            res.status(200).send({token: token})
        } catch (error) {
            res.status(500).json(error)
        }
    }

    authenticateUser(req: Request, res: Response, next: NextFunction): void {
        this.passport.authenticate('local', (err, user) => {
            if (err)
                return next(err)

            if (!user) {
                return res.status(401).json({status: 'error', code: 'unauthorized'})
            } else {
                const token = jwt.sign({email: user.email}, JWT_SECRET)
                res.status(200).send({token: token})
            }
        })
    }
}

