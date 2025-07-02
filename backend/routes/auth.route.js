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
    verifyEmailOtp,
} from "../controllers/auth.controller.js"

const authRouter = express.Router();

authRouter.post('/signup', signupValidator, signup);
authRouter.post('/signin', signinValidator, signin);
authRouter.post('/verify-otp', verifyEmailOtpValidator, verifyEmailOtp);

// Protected routes
authRouter.use(verifyToken);
authRouter.get('/protected', (req, res) => { // only testing purpose
    console.log(`userId: ${req.userId}, name: ${req.name}, username: ${req.username}, email: ${req.email}, isAccountVerified: ${req.isAccountVerified}`);
    res.send('Protected route');
});

export default authRouter;