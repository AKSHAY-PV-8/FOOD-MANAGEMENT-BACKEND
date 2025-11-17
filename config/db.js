import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Data base is connected")
    }catch(error){
        console.error("erron in database connection",error)
    }
}

export default connectDB
     
                                     