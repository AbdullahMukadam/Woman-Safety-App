import express from "express"
import { AddProfilePhoto } from "../Controllers/ProfileController.js"
import { upload } from "../Middlewares/Multer.js"
const router = express.Router()

router.post("/add-photo", upload.single("photo"), async (req, res, next) => {
    try {
        await AddProfilePhoto(req, res)
    } catch (error) {
        next(error)
    }
})


export default router