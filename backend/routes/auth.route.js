import express from "express";
import { verifyToken } from "../utils/index.js";
import {
    signupValidator,
    signinValidator,
} from "../validators/auth.validator.js";
import {
    signup,
    signin,
    logout,
} from "../controllers/user.controller.js"

const authRouter = express.Router();

authRouter.post('/signup', signupValidator, signup);
authRouter.post('/signin', signinValidator, signin);
authRouter.post('/logout', logout);

export default authRouter;