import {Router} from 'express'
import userController, {UserController} from '../controllers/userController'
import {IRoutes} from './routesInterface'

export class UserRoutes implements IRoutes {
    public readonly router: Router
    private readonly usersController: UserController

    constructor(usersController: UserController) {
        this.router = Router()
        this.usersController = usersController
        this.routes()
    }

    private routes(): void {
        this.router.post('/register', this.usersController.registerUser.bind(this.usersController))
        this.router.post('/login', this.usersController.authenticateUser.bind(this.usersController))
    }
}

export default new UserRoutes(userController)