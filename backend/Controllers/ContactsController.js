import User from "../Models/UserModel.js";
import { cloudinaryUpload } from "../Utils/Cloudinary.js";
import fs from "fs"

const AddContact = async (req, res) => {
    const {  MobileNo, name, userId } = req.body;
    const userID = userId
    let photo ;

    if ( !MobileNo || !name) {
        return res.status(400).json({ message: "Please enter all the fields" });
    }

    if(req.file){
        console.log(req.file);
        const uploadResponse = await cloudinaryUpload(req.file.path);
        photo = uploadResponse;

        fs.unlink(req.file.path, (err) => {
            if (err) console.error('Error deleting local file:', err);
          });
    }

    try {

        const updatedUser = await User.findByIdAndUpdate(userID, {
            $push: {
                contacts: {
                    user: userID,
                    photo,
                    name,
                    MobileNo
                }
            }
        }, {
            new: true,
        })
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const newContact = updatedUser.contacts[updatedUser.contacts.length - 1];

        res.status(201).json({
            message: "Contact added successfully",
            contact: newContact
        });
        
    } catch (error) {
        return res.status(500).json({ message: "An Error occured in Adding Contact" })
    }

}

export { AddContact }