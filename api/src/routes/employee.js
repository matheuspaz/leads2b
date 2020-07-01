import { Router } from 'express'
import EmployeeController from '../controllers/EmployeeController'
import Auth from '../middlewares/Auth'

const router = Router()

router.post('/employee', Auth, EmployeeController.create)
router.put('/employee/:id', Auth, EmployeeController.update)
router.delete('/employee/:id', Auth, EmployeeController.delete)
router.get('/employee/:id', Auth, EmployeeController.get)
router.get('/employees', Auth, EmployeeController.all)

export default router
