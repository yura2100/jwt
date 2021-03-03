import express, {Application} from 'express'
import {errorHandler} from './middlewares/errorHandler'
import userRouter from "./routes/userRoutes";

class App {
    public readonly app: Application

    constructor() {
        this.app = express()
        this.initializeMiddlewares()
        this.initializeErrorHandling()
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}))
        this.app.use('/', userRouter)
    }

    private initializeErrorHandling(): void {
        this.app.use(errorHandler)
    }
}

const {app} = new App()

module.exports = {app}