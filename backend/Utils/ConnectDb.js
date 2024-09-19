import mongoose from "mongoose"

const ConnectToDb =async ()=>{
 try {
   const status= await mongoose.connect(process.env.MONGO_URI)
   if(status){
    console.log("Connected to Database")
   } else if(status.error){
    console.log(error)
   }
 } catch (error) {
    console.log("Error in Connecting to Database", error)
 }
}

export default ConnectToDb