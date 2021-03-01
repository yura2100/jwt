import express from 'express'
const {Sequelize} = require('sequelize')

class App {
    public app: express.Application
    public connection

    constructor() {
        this.app = express()
        this.config()
        this.connection = this.connectToDatabase()
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}))
    }

    private connectToDatabase() {
        return new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                port: Number(process.env.DB_PORT),
                host: process.env.DB_HOST,
                dialect: 'postgres'
            }
        )
    }
}

export const {app, connection} = new App()