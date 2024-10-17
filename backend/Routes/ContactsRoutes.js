import express from "express";
import { AddContact } from "../Controllers/ContactsController.js";
import { upload } from "../Middlewares/Multer.js";

const router = express.Router();


router.post("/addcontact", upload.single("photo"), async (req, res, next) => {
  try {
    await AddContact(req, res);
  } catch (error) {
    next(error); 
  }
});

export default router;
