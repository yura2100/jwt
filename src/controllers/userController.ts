import {Request, Response, NextFunction} from 'express'
import {User} from '../models/userModel'
import HttpException from '../exceptions/httpException'
import {UserService} from '../services/userService'

export class UserController {
    getUser(req: Request, res: Response) {
        const {id, email, name} = req.user as User

        res.status(200).send({id, email, name})
    }

    async registerUser(req: Request, res: Response): Promise<void> {
        const userService = new UserService()

        const {email, password, name} = req.body

        try {
            const user: User = await userService.addUser(email, password, name)

            res.status(200).send(await user.toAuthJSON())
        } catch (error) {
            throw new HttpException(401, error.message)
        }
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        const user: User = req.user as User

        res.status(200).send(await user.toAuthJSON())
    }

    // async refreshUsersToken(req: Request, res: Response): Promise<void> {
    //
    // }
    //
    // async logOut(req: Request) {
    //     const userService = new UserService()
    //
    //     await userService.deleteUsersRefreshToken()
    // }
}

export default new UserController()

