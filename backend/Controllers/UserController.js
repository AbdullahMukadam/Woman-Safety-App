import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs"
import CreateToken from "../Utils/CreateToken.js";

 const Signup = async (req, res)=>{
  const {username, email, password} = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please enter all the fields" });
  }

  const emailExits = await User.findOne({email})
  if(emailExits){
    res.status(401)
    return res.status(409).json({ message: "Email already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)
    const NewUser = await new User({username, email, password:hashedPassword})
    if(NewUser){
        await NewUser.save();

      const Token = CreateToken(NewUser._id)
      res.cookie("jwt", Token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge:30 * 24 * 60 * 60 * 1000,
      })
        .status(200).json({
            _id:NewUser._id,
            email:NewUser.email,
            profilephoto:NewUser.profilePhoto,
            reviews:NewUser.reviews
        })
    }

  } catch (error) {
    res.status(500).json({ message: "An error occurred during signup" });
  }
 }

 const Login =async (req,res)=>{
  const {email, password} = req.body
 }

 export {Signup, Login}