import mongoose from "mongoose"

const ConnectToDb =async ()=>{
 try {
   const status= await mongoose.connect("")
   if(status){
    console.log("Connected to Database")
   }
 } catch (error) {
    console.log("Error in Connecting to Database", error)
 }
}

export default ConnectToDb