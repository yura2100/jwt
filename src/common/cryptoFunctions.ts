import {promisify} from 'util'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? ''

export async function generateRefreshToken(): Promise<string> {
    const randomBytes = promisify(crypto.randomBytes)

    const refreshTokenBuffer = await randomBytes(32)

    return refreshTokenBuffer.toString('hex')
}

export function generateAccessToken(id: number): string {
    return jwt.sign({
        id
    }, JWT_SECRET, {expiresIn: (10 * 60)})
}