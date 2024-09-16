import express from "express"
import { Signup } from "../Controllers/UserController.js"
const router = express.Router()

router.post("/",Signup)

export default router