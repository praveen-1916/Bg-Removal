import User from "../models/UserModel.js";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";

const BackgroundRemovalController = async (req, res) => {
  try {
    const { clerkId } = req.body;
    const user = await User.findOne({ clerkId: clerkId });

    if (!user) {
      res.json({ success: false, message: "User not found in our database" });
    }
    if (user.creditBalance === 0) {
      res.json({ success: false, message: "Insufficient credits" });
    }

    console.log(req.file);
    const imagePath = req.file.path;
    const imageFile = fs.createReadStream(imagePath);

    const formData = new FormData();
    formData.append("image_file", imageFile);

    const { data } = await axios.post(
      "https://clipdrop-api.co/remove-background/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.YOUR_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;
    await User.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });
    res.json({
      success: true,
      message: "Image Background Removed Successfully",
      resultImage,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default BackgroundRemovalController;
