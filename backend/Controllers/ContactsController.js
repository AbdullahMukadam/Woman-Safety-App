import User from "../Models/UserModel.js";

const AddContact = async (req, res) => {
    const { photo, MobileNo, name } = req.body;
    const userID = req.body.userId

    if (!photo || !MobileNo || !name) {
        return res.status(400).json({ message: "Please enter all the fields" });
    }

    try {
        return res.status(200).json({
            photo,
            MobileNo,
            name,
            userID
        })
    } catch (error) {
        return res.status(500).json({ message: "An Error occured in Adding Contact" })
    }

}

export { AddContact }