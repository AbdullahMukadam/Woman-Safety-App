import express from "express"
import { AddContact } from "../Controllers/ContactsController.js"
const router = express.Router()

router.post("/addcontact",AddContact)

export default router