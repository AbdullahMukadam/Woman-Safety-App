import User from "../Models/UserModel";

 const Signup = async (req, res)=>{
  const {username, email, password} = req.body;

  if (!username || !email || !password) {
    throw new Error("Please Enter All the Fields")
  }

  const emailExits = await User.findOne({email})
  if(emailExits){
    res.status(401)
    throw new Error("Please Enter Different Email")
  }

  try {
    const NewUser = await new User({username, email, password})
    if(NewUser){
        await NewUser.save();

        res.status(200).json({
            _id:NewUser._id,
            email:NewUser.email,
            profilephoto:NewUser.profilePhoto,
            reviews:NewUser.reviews
        })
    }

  } catch (error) {
    res.status(402)
    throw new Error("Error Occured:", error)
  }
 }

 export {Signup}