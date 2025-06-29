import express from "express";
import { verifyToken } from "../utils/index.js";
import {
    signupValidator,
    signinValidator,
    verifyEmailOtpValidator,
} from "../validators/auth.validator.js";
import {
    signup,
    signin,
    logout,
    verifyEmailOtp,
} from "../controllers/auth.controller.js"

const authRouter = express.Router();

authRouter.post('/signup', signupValidator, signup);
authRouter.post('/signin', signinValidator, signin);
authRouter.post('/logout', logout);

authRouter.use(verifyToken);
authRouter.post('/verify-otp', verifyEmailOtpValidator, verifyEmailOtp);

export default authRouter;