import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../config/database'

export class User extends Model {
    public id!: number
    public email!: string
    public password!: string
    public name!: string
    public refreshToken!: string | null

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            name: this.name
        }
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'users',
        sequelize
    }
)