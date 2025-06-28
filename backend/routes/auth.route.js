import express from "express";
import { verifyToken } from "../utils/index.js";
import {
    signupValidator,
} from "../validators/auth.validator.js";
import {
    signup,
} from "../controllers/user.controller.js"

const authRouter = express.Router();

authRouter.post('/signup', signupValidator, signup);

export default authRouter;