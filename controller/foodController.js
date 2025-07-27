
import FoodModel from "../model/foodModel.js";
import fs from "fs"

const handleAddFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`
    const food = new FoodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category
    })
    try {
        await food.save()
       res.status(500).json({msg:"upload successfully"})
    } catch (error) {
        console.log("uplpad error is",error)
        res.status(404).json({success:"false"})
    }
}

const handleAllFood = async (req,res)=>{
    try {
        const food = await FoodModel.find({})
        res.json({success:"true",data:food})
    } catch (error) {
        console.log("all food get the data:-",error);
        res.status(404).json({success:"false"})
    }
}
//remove food
const handleRemoveFood = async(req,res)=>{
    try {
        const food = await FoodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})
        await FoodModel.findByIdAndDelete(req.body.id)
        res.status(200).json({success:"true"})
    } catch (error) {
        console.log("delete error:-",error);
        res.status(404).json({success:"false"})
    }
}


export {handleAddFood,handleAllFood,handleRemoveFood}
