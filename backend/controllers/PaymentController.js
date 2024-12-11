import Razorpay from "razorpay";
import Payment from "../models/PaymentModel.js";
import User from "../models/UserModel.js";
// import razorpay from "razorpay";

//creating payment gateway using razorpay

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//api for payment initializing
const razorpayPaymentInitializing = async (req, res) => {
  try {
    const { clerkId, planId } = req.body;

    if (!clerkId && !planId) {
      res.json({ success: false, message: "Please provide valid data!" });
    }

    const paymentData = {
      clerkId: clerkId,
      plan: "",
      amount: 0,
      credits: 0,
    };

    switch (planId) {
      case "Basic": {
        paymentData.plan = "Basic";
        paymentData.credits = 50;
        paymentData.amount = 10;

        break;
      }
      case "Advanced": {
        paymentData.plan = "Advanced";
        paymentData.credits = 500;
        paymentData.amount = 100;

        break;
      }
      case "Business": {
        paymentData.plan = "Business";
        paymentData.credits = 2500;
        paymentData.amount = 500;

        break;
      }

      default:
        break;
    }

    const newPayment = await Payment.create(paymentData);

    const options = {
      amount: newPayment.amount * 100,
      currency: process.env.RAZORPAY_CURRENCY,
      receipt: newPayment._id,
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        res.json({
          success: false,
          message: error.message,
        });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//api for payment verification

const razorpayPaymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const paymentData = await Payment.findById(orderInfo.receipt);
      if (paymentData.paymentStatus) {
        res.json({ success: false, message: "Payment already verified" });
      }

      //adding credits to your data on successful payment
      const userData = await User.findOne({ clerkId: paymentData.clerkId });
      const creditBalance = userData.creditBalance + paymentData.credits;
      //making payment status to true
      await User.findByIdAndUpdate(userData._id, { creditBalance });
      await Payment.findByIdAndUpdate(paymentData._id, { paymentStatus: true });
      res.json({ success: true, message: "Credits added successfully" });
    } else {
      res.json({
        success: false,
        message: "Payment Failed",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { razorpayPaymentInitializing, razorpayPaymentVerification };
