import {Router} from 'express'
import { EditProfile, createCustomer, deleteUser, getUserByEmail, signIn } from '../controller/customer-controller'
import { auth } from '../middleware/customer.protect'

const router=Router()

//create new customer

router.post('/create',createCustomer)
router.post('/',getUserByEmail)
router.post('/sign-in',signIn)
router.put('/:id',auth,EditProfile)
router.delete('/:id',auth,deleteUser)


export default router

