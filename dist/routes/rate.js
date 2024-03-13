import { Router } from "express";
import { auth } from "../middleware/customer.protect";
import { rateProduct } from "../controller/rate-controller";
const router = Router();
router.put('/:userId/:productId', auth, rateProduct);
export default router;
