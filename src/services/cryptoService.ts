import {promisify} from 'util'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import {User} from '../models/userModel'

const JWT_SECRET = process.env.JWT_SECRET ?? ''

export async function generateRefreshToken(): Promise<string> {
    const randomBytes = promisify(crypto.randomBytes)

    const refreshTokenBuffer = await randomBytes(32)

    return refreshTokenBuffer.toString('hex')
}

export function generateAccessToken(user: User): string {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, JWT_SECRET, {expiresIn: (10 * 60)})
}