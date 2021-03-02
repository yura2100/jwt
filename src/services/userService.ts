import {User} from '../models/userModel'

export class UserService {

    async addUser(email: string, password: string, name: string): Promise<User> {
        const user: User = User.build({email, password, name})
        await user.hashPassword(password)

        return user
    }

    async findUser(email: string): Promise<User> {
        return await User.findOne({
            where: {email}
        })
    }
}

export const userService =  new UserService()