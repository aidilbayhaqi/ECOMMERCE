import express from "express";
import { getCart, addCart, deleteCart } from "../controllers/Cart.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/cart", verifyUser, getCart);
router.post("/cart", verifyUser, addCart);
router.delete("/cart", verifyUser, deleteCart);

export default router;
