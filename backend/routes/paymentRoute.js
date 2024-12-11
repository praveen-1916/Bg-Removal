import { Router } from "express";
import authUser from "../middleware/authUser.js";
import {
  razorpayPaymentInitializing,
  razorpayPaymentVerification,
} from "../controllers/PaymentController.js";

const paymentRoute = Router();

paymentRoute.post(
  "/razorpay-initialize",
  authUser,
  razorpayPaymentInitializing
);
paymentRoute.post("/razorpay-verfitication", razorpayPaymentVerification);

export default paymentRoute;
