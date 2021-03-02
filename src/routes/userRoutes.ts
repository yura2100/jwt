import {Router} from 'express'
import userController, {UserController} from '../controllers/userController'
import {IRoutes} from './routesInterface'

export class UserRoutes implements IRoutes{
    public readonly router: Router
    private usersController: UserController

    constructor(usersController: UserController) {
        this.router = Router()
        this.usersController = usersController
        this.routes()
    }

    private routes(): void {
        this.router.post('/register', this.usersController.registerUser)
        this.router.post('/login', this.usersController.authenticateUser)
    }
}

export default new UserRoutes(userController)