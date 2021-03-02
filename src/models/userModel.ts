import {Sequelize} from 'sequelize'
const {Model, DataTypes} = require('sequelize')
import bcrypt from 'bcrypt'
import {JWT_SECRET} from '../util/secrets.js'
import jwt from 'jsonwebtoken'

const sequelize = new Sequelize(
    process.env.POSTGRES_URI ?? '', {
        define: {
            timestamps: false
        }
    }
)

export class User extends Model {
    public id!: number
    public email!: string
    public password!: string
    public name!: string

    async hashPassword(password: string) {
        this.password = await bcrypt.hash(password, 10)

        await this.save()
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password)
    }

    generateJWT(): string {
        const today: Date = new Date()
        const expirationDate: Date = new Date(today)
        expirationDate.setDate(today.getDate() + 60)

        return jwt.sign({
            id: this.id,
            email: this.email,
            exp: Math.round(expirationDate.getTime() / 1000)
        }, JWT_SECRET)
    }

    toAuthJSON(): {id: number, email: string, token: string} {
        return {
            id: this.id,
            email: this.email,
            token: this.generateJWT()
        }
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: new DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: new DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "users",
        sequelize
    }
)