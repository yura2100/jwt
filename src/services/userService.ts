import {User} from '../models/userModel'
import bcrypt from "bcrypt";
import {generateAccessToken, generateRefreshToken} from "../common/cryptoFunctions";
import {Op} from "sequelize";

export class UserService {
    async getOne(id: number) {
        return await User.findByPk(id)
    }

    async create(email: string, password: string, name: string): Promise<User> {
        const user: User = User.build({email, password, name})
        await this.hashPassword(user)

        return user
    }

    async getOneByEmail(email: string): Promise<User | null> {
        return await User.findOne({
            where: {email}
        })
    }

    async refreshJWT(id: number, refreshToken: string) {
        const user = await User.findOne({
            where: {
                [Op.and]: [{id}, {refreshToken}]
            }
        }) as User

        const authJSON = await this.generateAuthJSON(user)
        await this.setRefreshToken(user, authJSON.refreshToken)

        return authJSON
    }

    async hashPassword(user: User) {
        user.password = await bcrypt.hash(user.password, 10)

        await user.save()
    }

    async validatePassword(user: User, password: string): Promise<boolean> {
        return await bcrypt.compare(password, user.password)
    }


    async setRefreshToken(user: User, token: string | null): Promise<void> {
        user.refreshToken = token

        await user.save()
    }

    async generateAuthJSON(user: User) {
        const {id} = user

        const accessToken = generateAccessToken(id)
        const refreshToken = await generateRefreshToken()

        return {
            id,
            accessToken,
            refreshToken
        }
    }
}

export const userService = new UserService()