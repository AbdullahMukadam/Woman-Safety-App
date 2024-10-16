import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import UserRoutes from "../backend/Routes/UserRoutes.js"
import ContactRoutes from "../backend/Routes/ContactsRoutes.js"

import ConnectToDb from "./Utils/ConnectDb.js";
import cors from "cors"

dotenv.config()
const app = express()

const isDevelopment = process.env.NODE_ENV === 'development';
const allowedOrigins = [
    'http://localhost:5173',
    'http://192.168.152.133:5173',
  ];

app.use(cors({
  origin: isDevelopment 
    ? true 
    : allowedOrigins, 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

ConnectToDb();

app.use("/api/user",UserRoutes)
app.use("/api/contacts",ContactRoutes)

app.listen(process.env.PORT, ()=>{
    console.log("Server Started")
})