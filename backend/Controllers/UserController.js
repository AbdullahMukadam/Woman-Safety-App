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
  const {email, password} = req.body;

  const exitsEmail = await User.findOne({email})

  if(!exitsEmail){
    return res.status(401).json({message:"No User Found"})
  } else{
    const comparePassword = await bcrypt.compare(password, exitsEmail.password);
    if(comparePassword){
      const token = CreateToken(exitsEmail._id)

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge:30 * 24 * 60 * 60 * 1000,
      })
        .status(200).json({
            _id:exitsEmail._id,
            email:exitsEmail.email,
            profilephoto:exitsEmail.profilePhoto,
            reviews:exitsEmail.reviews
        })
    }else{
      res.status(409).json({message:"Invalid Credentials"})
    }
  }
 }

 const Logout = async (req, res)=>{
  try {
    res.cookie("jwt", "",{
      expiresIn: new Date()
    }).json({message:"Logout Seccusfully"})
  } catch (error) {
    res.status(400).json({message:"Logout Unsuccesful"})
  }
  
 }

const GoogleAuthController =async (req, res)=>{

}

 export {Signup, Login, Logout, GoogleAuthController}