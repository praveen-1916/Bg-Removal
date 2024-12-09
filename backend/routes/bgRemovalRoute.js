import { Router } from "express";
import upload from "../middleware/multer.js";
import authUser from "../middleware/authUser.js";
import BackgroundRemovalController from "../controllers/BackgroundRemovalController.js";

const bgRemovalRouter = Router();

bgRemovalRouter.post(
  "/remove-background",
  upload.single("image"),
  authUser,
  BackgroundRemovalController
);

export default bgRemovalRouter;
