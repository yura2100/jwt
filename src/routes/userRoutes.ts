import {Router} from 'express'
import userController from '../controllers/userController'
import {authenticate} from "../controllers/authController";

const router = Router()

router.post('/get', authenticate('jwt'), userController.getUser)
router.post('/register', userController.registerUser)
router.post('/login', authenticate('local'), userController.loginUser)

export default router