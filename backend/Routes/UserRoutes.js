import express from "express"
import { GoogleAuthController, Login, Logout, Signup } from "../Controllers/UserController.js"
const router = express.Router()

router.post("/signup",Signup)
router.post("/login", Login)
router.post("/googleLogin", GoogleAuthController)
router.post("/logout",Logout)

export default router