import bcrypt from "bcryptjs";
import AuthService from "../services/auth.service.js";
import { generateTokenAndSetCookie } from "../utils/index.js";
import { transporter } from "../config/index.js";

export const signup = async (req, res) => {
    const authService = new AuthService();
    try {
        const { name, username, password, confirmPassword, email } = req.body;
        // console.log(`name: ${name}, username: ${username}, password: ${password}, confirmPassword: ${confirmPassword}, email: ${email}`);

        if (!name || !username || !password || !confirmPassword || !email) {
            return res.status(400).json({
                message: "Please provide all the required fields",
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password and confirm password do not match",
            })
        }

        // check if username is already taken
        const existedUser = await authService.getUserByUsername(username);
        if (existedUser) {
            return res.status(400).json({
                message: "Username already taken",
            })
        }

        // check if email is already taken
        const existedEmail = await authService.getUserByEmail(email);
        if (existedEmail) {
            return res.status(400).json({
                message: "Email already taken",
            })
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUserData = {
            name,
            username,
            password: hashedPassword,
            email,
        }

        const newUser = await authService.createUser(newUserData);

        if (newUser) {
            // generate token and set cookie
            generateTokenAndSetCookie(newUser._id, res);

            if (newUser?.isAccountVerified) {
                return res.status(400).json({
                    success: false,
                    message: "User already verified",
                })
            }

            // generate verification token = 6 digit random number
            const otp = String(Math.floor(100000 + Math.random() * 900000));

            // set OTP in user's document
            newUser.verifyOtp = otp;
            newUser.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
            await newUser.save();

            // Send verification OTP to user's email
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: newUser?.email,
                subject: "Account Verification OTP",
                text: `Your OTP is ${otp}. This OTP is valid for 24 hours. Verify your account using this OTP.`,
            }
            await transporter.sendMail(mailOptions);

            const { password: pass, ...rest } = newUser._doc;

            res.status(201).json({
                user: rest,
                success: true,
                message: "User created and send opt successfully",
            })
        }

    } catch (error) {
        console.log(`Error in signup: ${error.message}`);
        return res.status(500).json({
            message: "Error in signup controller",
            error: error.message,
        })
    }
}

export const verifyEmailOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const { _id: userId } = req.user;
        const authService = new AuthService();

        if (!userId || !otp) {
            return res.status(400).json({
                message: "User id and otp are required",
            })
        }

        const user = await authService.getUserById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            })
        }

        // Check if OTP is valid or not
        if (user?.verifyOtp === "" || user?.verifyOtp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
            })
        }

        // Check if OTP is expired or not
        if (user?.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({
                message: "OTP expired",
            })
        }

        // Update user's account verification status
        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;
        const savedUser = await user.save();
        const { password: pass, ...rest } = savedUser._doc;

        res.status(200).json({
            user: rest,
            success: true,
            message: "Account verified successfully",
        })
    } catch (error) {
        console.log(`Error in verifyEmailOtp: ${error.message}`);
        return res.status(500).json({
            message: "Error in verifyEmailOtp controller",
            error: error.message,
        })
    }
}

export const signin = async (req, res) => {
    try {
        const authService = new AuthService();
        const { email, password } = req.body;

        const foundUser = await authService.getUserByEmail(email);
        if (!foundUser) {
            return res.status(400).json({
                message: "User not found",
            })
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password",
            })
        }

        // generate token and set cookie
        generateTokenAndSetCookie(foundUser._id, res);
        const { password: pass, ...rest } = foundUser._doc;

        res.status(200).json({
            user: rest,
            success: true,
            message: "User logged in successfully",
        })
    } catch (error) {
        console.log(`Error in signin: ${error.message}`);
        return res.status(500).json({
            message: "Error in signin controller",
            error: error.message,
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            message: "User logged out successfully",
        });
    } catch (error) {
        console.log(`Error in logout: ${error.message}`);
        return res.status(500).json({
            message: "Error in logout controller",
            error: error.message,
        })
    }
}
