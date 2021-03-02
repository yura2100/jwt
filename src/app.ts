import express, {Application} from 'express'
import {Sequelize} from 'sequelize'
import {IRoutes} from './routes/routesInterface'
import {errorHandler} from './middlewares/errorHandler'
import userRoutes from "./routes/userRoutes";

class App {
    public readonly app: Application
    //public readonly connection: Sequelize

    constructor(routes: IRoutes[]) {
        this.app = express()
        this.initializeMiddlewares()
        this.initializeErrorHandling()
        //this.connection = this.connectToDatabase()
        this.routes(routes)
    }

    private routes(routes: IRoutes[]): void {
        routes.forEach((route) => this.app.use(route.router))
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}))
    }

    private initializeErrorHandling(): void {
        this.app.use(errorHandler)
    }

    // private connectToDatabase() {
    //     return new Sequelize(
    //         process.env.POSTGRES_URI ?? ''
    //     )
    // }
}

const {app} = new App([userRoutes])
//connection.sync({force: true})

module.exports = {app}