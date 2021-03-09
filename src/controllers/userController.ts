import {Request, Response, NextFunction} from 'express'
import {User} from '../models/userModel'
import HttpException from '../exceptions/httpException'
import {userService, UserService} from '../services/userService'

export class UserController {
    constructor(private userService: UserService) {}

    async getOne(req: Request, res: Response) {
        const id = Number(req.body.id)

        const user = await this.userService.getOne(id) as User

        res.status(200).send(user.toJSON())
    }


    async register(req: Request, res: Response, next: NextFunction) {
        const {email, password, name} = req.body

        try {
            const user = await this.userService.create(email, password, name)

            const authJSON = await this.userService.generateAuthJSON(user)
            await this.userService.setRefreshToken(user, authJSON.refreshToken)

            res.status(200).send(authJSON)
        } catch (error) {
            next(new HttpException(401, error.message))
        }
    }

    async login(req: Request, res: Response) {
        const user: User = req.user as User

        const authJSON = await this.userService.generateAuthJSON(user)
        await this.userService.setRefreshToken(user, authJSON.refreshToken)

        res.status(200).send(authJSON)
    }

    async refreshJWT(req: Request, res: Response, next: NextFunction) {
        try {
            const {id, refreshToken} = req.body

            const authJSON = await this.userService.refreshJWT(id, refreshToken)

            res.status(200).send(authJSON)
        } catch (error) {
            next(new HttpException(401, 'Id or refreshToken is incorrect'))
        }
    }

    async logout(req: Request, res: Response) {
        const id = req.body.id

        const user = await this.userService.getOne(id) as User
        await this.userService.setRefreshToken(user, null)

        res.status(200).send('Successful logout')
    }
}

export default new UserController(userService)

