import { Router } from 'express'
import UserController from '../controllers/UserController'
import Auth from '../middlewares/Auth'

const router = Router()

router.post('/user', Auth, UserController.create)
router.put('/user/:id', Auth, UserController.update)
router.delete('/user/:id', Auth, UserController.delete)
router.get('/user/:id', Auth, UserController.get)
router.get('/users', Auth, UserController.all)

export default router
