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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

ConnectToDb();

app.use("/api/user", UserRoutes)
app.use("/api/contacts", ContactRoutes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

app.listen(process.env.PORT, () => {
  console.log("Server Started")
  //console.log( process.env.CLOUDINARY_CLOUD_NAME,process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_SECRET)
})