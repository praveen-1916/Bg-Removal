import { Router } from "express";
import {
  ClerkAuthentication,
  getCreditBalance,
} from "../controllers/AuthenticationController.js";
import authUser from "../middleware/authUser.js";

const authenticationRoute = Router();

authenticationRoute.post("/authenticate", ClerkAuthentication);
authenticationRoute.get("/creditbalance", authUser, getCreditBalance);

export default authenticationRoute;
