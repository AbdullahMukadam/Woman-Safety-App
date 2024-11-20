import User from "../Models/UserModel.js";
import { cloudinaryUpload } from "../Utils/Cloudinary.js";
import fs from "fs";
import getPublicIdFromUrl from "../Utils/getPublicIdFromUrl.js";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios"

const AddContact = async (req, res) => {
  const { MobileNo, name, userId } = req.body;

  if (!MobileNo || !name || !userId) {
    return res.status(400).json({ message: "Please enter all the fields" });
  }

  let photo;

  try {

    if (req.file) {
     // console.log("Received file:", req.file);


      photo = await cloudinaryUpload(req.file.path);
     // console.log("Uploaded photo URL:", photo);

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

const DeleteContact = async (req, res) => {
  const { userId, contactId } = req.query;

  if (!userId || !contactId) {
    return res.status(400).json({ message: "User ID and Contact ID are required" });
  }

  try {

    const user = await User.findById(userId)

    const ContactToDelete = await user.contacts.find((contact) => contact._id.toString() === contactId)

    if (!ContactToDelete) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (ContactToDelete.photo) {
      try {

        const publicId = getPublicIdFromUrl(ContactToDelete.photo);
        const status = await cloudinary.uploader.destroy(publicId);
        console.log("deleted Successfully", status)
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);

      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { contacts: { _id: contactId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully", user: updatedUser });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "An error occurred while deleting the contact" });
  }
};

const SendEmergencyInfo = async (req, res) => {
  try {
    const { contactNumbers, location } = req.body;
   // console.log('Received data:', { contactNumbers, location });

    
    if (!contactNumbers || !location || !location.latitude || !location.longitude) {
      return res.status(400).json({
        message: "Contact numbers and location are required"
      });
    }

   
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;

    
    const messageText = `EMERGENCY ALERT! Location: ${mapsLink} Please respond immediately.`;

   
    const smsPromises = contactNumbers.map(async (number) => {
      try {
        const response = await axios({
          method: 'post',
          url: 'https://www.fast2sms.com/dev/bulkV2',
          headers: {
            'authorization': process.env.FAST2SMS_API_KEY,
            'Content-Type': 'application/json'
          },
          data: {
            route: 'q', 
            message: messageText,
            numbers: number.replace(/\D/g, ''), 
            flash: 0
          }
        });

        return {
          number,
          status: 'success',
          messageId: response.data.message[0]
        };

      } catch (error) {
        console.error(`Error sending to ${number}:`, error);
        return {
          number,
          status: 'failed',
          error: error.message
        };
      }
    });

    
    const results = await Promise.all(smsPromises);

    
    const successfulSends = results.filter(result => result.status === 'success');

    if (successfulSends.length === 0) {
      return res.status(500).json({
        message: "Failed to send all messages",
        details: results
      });
    }

    return res.status(200).json({
      message: "Emergency alerts sent",
      results: results
    });

  } catch (error) {
    console.error('Emergency alert error:', error);
    return res.status(500).json({
      message: "Error sending emergency alerts",
      error: error.message
    });
  }
};



export { AddContact, DeleteContact, SendEmergencyInfo };
