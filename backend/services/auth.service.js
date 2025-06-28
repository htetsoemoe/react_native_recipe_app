import mongoose from "mongoose";
import userSchema from "../models/user.model.js";

export default class AuthService {
    constructor() {
        this.userCollectionName = "users";
        this.userModel = mongoose.model(
            this.userCollectionName,
            userSchema
        )
    }

    async getUserById(id) {
        return await this.userModel.findById(id);
    }

    async getUserByUsername(username) {
        return await this.userModel.findOne({ username });
    }

    async getUserByEmail(email) {
        return await this.userModel.findOne({ email });
    }

    async createUser(userData) {
        return await this.userModel.create(userData);
    }
}