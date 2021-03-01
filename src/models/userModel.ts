const {Model, DataTypes} = require('sequelize')
const {connection} = require('../app')
import bcrypt from 'bcrypt'

export interface IUser {
    email: string
    password: string
    name: string

    isValidPassword(password: string): Promise<boolean>
}

interface UserAttributes extends IUser {
    id: number
}

export class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number
    public  email!: string
    public password!: string
    public name!: string

    async isValidPassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password)
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
        connection
    }
)