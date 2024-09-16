import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import UserRoutes from "../backend/Routes/UserRoutes.js"

dotenv.config()
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use("/api/user",UserRoutes)

app.listen(process.env.PORT, ()=>{
    console.log("Server Started")
})