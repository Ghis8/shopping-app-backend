import { Router } from "express";
import { auth } from "../middleware/customer.protect";
import { addToCart, addToFavorite, createProduct, getAllProducts, getProductById, updateProduct } from "../controller/product-controller";

const router=Router()


router.post('/create',auth,createProduct)
router.get('/products',auth,getAllProducts)
router.get('/:id',getProductById)
router.put('/:userId/:id',auth,updateProduct)
router.put('/:userId/:productId/favorite',auth,addToFavorite)
router.put('/:userId/:productId/cart',auth,addToCart)

export default router