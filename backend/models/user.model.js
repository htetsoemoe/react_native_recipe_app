import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            minlength: 6,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        profilePicture: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collation: { locale: "my" },
    }
)

export default userSchema;