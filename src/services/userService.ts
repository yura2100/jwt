import {User} from '../models/userModel'

export class UserService {

    async addUser(email: string, password: string, name: string): Promise<User> {
        const user: User = User.build({email, password, name})
        await user.hashPassword(password)

        return user
    }

    async findUser(email: string): Promise<User | null> {
        return await User.findOne({
            where: {email}
        })
    }

    // async refreshUsersToken(id: number, refreshToken: string): Promise<void> {
    //
    // }
    //
    // async deleteUsersRefreshToken(id: number): Promise<void> {
    //     await User.update({refreshToken: null}, {
    //         where: {id}
    //     })
    // }
}

export const userService =  new UserService()