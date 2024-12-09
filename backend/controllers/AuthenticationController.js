import { Webhook } from "svix";
import User from "../models/UserModel.js";

const ClerkAuthentication = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { type, data } = req.body;

    switch (type) {
      case "user.created":
        const userDetails = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };

        await User.create(userDetails);
        res.json({ success: true, message: "Account Created Successfully" });
        break;

      case "user.updated":
        const userUpdateDetails = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };
        await User.findOneAndUpdate({ clerkId: data.id }, userUpdateDetails);
        res.json({ success: true, message: "Account Updated Successfully" });
        break;

      case "user.deleted":
        await User.findOneAndDelete({ clerkId: data.id });
        res.json({ success: true, message: "Account Deleted Successfully" });
        break;

      default:
        res.json({ success: false, message: "Something went wrong" });
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const getCreditBalance = async (req, res) => {
  try {
    const { clerkId } = req.body;
    const userData = await User.findOne({ clerkId: clerkId });
    res.json({ success: true, creditBalance: userData.creditBalance });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { ClerkAuthentication, getCreditBalance };
