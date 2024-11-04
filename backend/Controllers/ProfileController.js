import User from "../Models/UserModel.js";
import { cloudinaryUpload } from "../Utils/Cloudinary.js";
import fs from "fs";

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

export { AddProfilePhoto };
