import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      const token_decode = jwt.decode(token);
      req.body.clerkId = token_decode.clerkId;
      next();
    } else {
      res.json({
        success: false,
        message: "Please authenticate with a valid token!",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
