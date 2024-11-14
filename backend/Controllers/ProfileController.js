import User from "../Models/UserModel.js";
import { cloudinaryUpload } from "../Utils/Cloudinary.js";
import fs from "fs";
import bcrypt from "bcryptjs";


const AddProfilePhoto = async (req, res) => {
    const { userId } = req.body;

    // Check if userId is provided
    if (!userId) {
        return res.status(400).json({ message: "UserId not received" });
    }

    try {
        let photo;

        // Check if a file is provided in the request
        if (req.file) {
            console.log("Received file:", req.file);

            // Upload the file to Cloudinary
            photo = await cloudinaryUpload(req.file.path);
            console.log("Uploaded photo URL:", photo);

            // Delete the file from the local server
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error("Error deleting local file:", err);
                } else {
                    console.log("Local file deleted successfully");
                }
            });
        } else {
            console.warn("No file provided, using default photo.");
            photo = "https://via.placeholder.com/150";  // Default placeholder image URL
        }

        // Find the user by ID and update their profile photo
        const user = await User.findByIdAndUpdate(
            userId,
            { profilePhoto: photo },
            { new: true }
        );

        // If user is not found, return 404
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Successfully updated the user's profile photo
        return res.status(200).json({
            message: "Profile photo updated successfully",
            updatedUser: user
        });
    } catch (error) {
        // Handle any errors that occurred during the process
        console.error("Error in AddProfilePhoto:", error);
        return res.status(500).json({ message: "An error occurred while updating the profile photo" });
    }
};

const UpdateUsername = async (req, res) => {
    try {
        const { userId, username } = req.body;

        // Validate input
        if (!userId || !username) {
            return res.status(400).json({
                success: false,
                message: "Please provide userId and username"
            });
        }


        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(400).json({
                success: false,
                message: "Username already taken"
            });
        }


        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Username updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error('Error updating username:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const UpdateEmail = async (req, res) => {
    try {
        const { userId, email, isGoogleUser } = req.body;

        // Validate input
        if (!userId || !email) {
            return res.status(400).json({
                success: false,
                message: "Please provide userId and email"
            });
        }
        else if (isGoogleUser) {
            return res.status(400).json({
                success: false,
                message: "Cannot update the email and password of a Google account"
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if email is already in use by another user
        const existingUser = await User.findOne({ email, _id: { $ne: userId } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already in use"
            });
        }

        // Update email
        user.email = email;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Email updated successfully",
            user: user.toObject({ virtuals: true })
        });

    } catch (error) {
        console.error('Error updating email:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Update Password
const UpdatePassword = async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;

        // Validate input
        if (!userId || !currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        // Check if new password is different from current password
        if (currentPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be the same as the current password"
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully",
            user: user.toObject({ virtuals: true })
        });

    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export { AddProfilePhoto, UpdateUsername, UpdateEmail, UpdatePassword };
