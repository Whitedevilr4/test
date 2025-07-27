import mongoose from "mongoose";

const connectDb = async () => {
    try {
         mongoose.connect(`${process.env.MONGO_URI}/vender`);
        console.log(`MongoDB Connected:`);
    } catch (error) {
        console.log("mongodb get error")
    }
};
export  {connectDb};