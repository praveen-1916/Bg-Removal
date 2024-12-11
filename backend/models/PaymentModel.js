import { model, Schema } from "mongoose";

const PaymentSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Payment = model("PaymentDetails", PaymentSchema);

export default Payment;
