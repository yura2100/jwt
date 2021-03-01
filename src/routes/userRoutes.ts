import {Router} from "express";
import {UserController} from "../controllers/userController";

export class UserRoutes {
    private router: Router
    private usersController: UserController

    constructor(usersController: UserController) {
        this.router = Router()
        this.usersController = usersController
    }

    public routes(): void {
        this.router.post('/register', this.usersController.registerUser)
        this.router.post('/login', this.usersController.authenticateUser)
    }
}