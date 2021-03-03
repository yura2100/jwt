import {Model, DataTypes} from 'sequelize'
import bcrypt from 'bcrypt'
import {sequelize} from '../config/database'
import {generateAccessToken, generateRefreshToken} from '../services/cryptoService'

export class User extends Model {
    public id!: number
    public email!: string
    public password!: string
    public name!: string
    public refreshToken!: string | null

    async hashPassword(password: string) {
        this.password = await bcrypt.hash(password, 10)

        await this.save()
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password)
    }

    async setRefreshToken(token: string): Promise<void> {
        this.refreshToken = token

        await this.save()
    }

    async toAuthJSON(): Promise<{ id: number, email: string, accessToken: string, refreshToken: string }> {
        const accessToken = generateAccessToken(this)
        const refreshToken = await generateRefreshToken()

        await this.setRefreshToken(refreshToken)

        return {
            id: this.id,
            email: this.email,
            accessToken,
            refreshToken
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
        tableName: "users",
        sequelize
    }
)