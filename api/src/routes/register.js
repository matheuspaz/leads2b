import { Router } from 'express'
import RegisterController from '../controllers/RegisterController'

const router = Router()

router.post('/register', RegisterController.register)

export default router
