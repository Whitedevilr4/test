import mongoose, { model } from "mongoose";
// import  Mongoose  from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:Number,require:true},
    image:{type:String,require:true},
})
const FoodModel = mongoose.model("Food",foodSchema)

export default FoodModel