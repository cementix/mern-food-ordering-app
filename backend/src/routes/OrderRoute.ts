import express from "express";
import OrderController from "../controllers/OrderController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  OrderController.createCheckoutSession
);

export default router;
