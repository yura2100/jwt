import {Router} from 'express'
import userController from '../controllers/userController'
import {authenticateJWT, authenticateLocal} from "../controllers/authController";

const router = Router()

router.get('/', authenticateJWT(), userController.getOne.bind(userController))
router.post('/register', userController.register.bind(userController))
router.post('/login', authenticateLocal(), userController.login.bind(userController))
router.post('/refresh', userController.refreshJWT.bind(userController))
router.get('/logout', authenticateJWT(), userController.logout.bind(userController))

export default router