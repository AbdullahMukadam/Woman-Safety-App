import express from "express"
import { AddContact } from "../Controllers/ContactsController.js"
import { upload } from "../Middlewares/Multer.js"
const router = express.Router()

router.post("/addcontact",upload.single("photo"),AddContact)

export default router