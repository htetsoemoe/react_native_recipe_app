import mongoose from "mongoose";

const favoritesSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        recipeId: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        cookTime: {
            type: String,
        },
        servings: {
            type: String,
        }
    },
    {
        timestamps: true,
        versionKey: false,
        collation: { locale: "my" },
    }
)

export default favoritesSchema;