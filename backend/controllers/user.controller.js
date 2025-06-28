import bcrypt from "bcryptjs";
import AuthService from "../services/auth.service.js";
import { generateTokenAndSetCookie } from "../utils/index.js";

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
        const { password: pass, ...rest } = newUser._doc;

        // generate token and set cookie
        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            user: rest,
            success: true,
            message: "User created successfully",
        })

    } catch (error) {
        console.log(`Error in signup: ${error.message}`);
        return res.status(500).json({
            message: "Error in signup controller",
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

