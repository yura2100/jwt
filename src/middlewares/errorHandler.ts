import {Request, Response, NextFunction} from 'express'
import HttpException from '../exceptions/httpException'

export function errorHandler (error: HttpException, req: Request, res: Response, next: NextFunction) {
    const {status, message} = error
    res.status(status)
        .json({status, message})
}