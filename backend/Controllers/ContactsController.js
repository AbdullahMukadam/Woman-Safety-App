import User from "../Models/UserModel.js";
import { cloudinaryUpload } from "../Utils/Cloudinary.js";
import fs from "fs";

const AddContact = async (req, res) => {
  const { MobileNo, name, userId } = req.body;

  if (!MobileNo || !name || !userId) {
    return res.status(400).json({ message: "Please enter all the fields" });
  }

  let photo;

  try {
    
    if (req.file) {
      console.log("Received file:", req.file);

     
      photo = await cloudinaryUpload(req.file.path);
      console.log("Uploaded photo URL:", photo);

      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting local file:", err);
      });
    } else {
      console.warn("No file provided, using default photo.");
      photo = "https://via.placeholder.com/150"; 
    }

    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          contacts: { user: userId, photo, name, MobileNo },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const newContact = updatedUser.contacts[updatedUser.contacts.length - 1];

    res.status(201).json({
      message: "Contact added successfully",
      contact: newContact,
    });

  } catch (error) {
    console.error("Error in AddContact:", error);
    res.status(500).json({ message: "An error occurred in Adding Contact" });
  }
};

export { AddContact };
