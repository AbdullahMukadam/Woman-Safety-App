import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    location: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    }
});

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function() {
            return !this.isGoogleUser; // Password only required for non-Google users
        }
    },
    profilePhoto: {
        type: String,
        default: "../Utils/woman.webp"
    },
    reviews: {
        type: [ReviewSchema],
        default: []
    },
    // New fields for Google Authentication
    googleId: {
        type: String,
        sparse: true // This allows the field to be unique only when it exists
    },
    isGoogleUser: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Add timestamps for created and updated dates
});

// Add index for googleId to improve query performance
UserSchema.index({ googleId: 1 }, { sparse: true });

const User = mongoose.model("User", UserSchema);

export default User;