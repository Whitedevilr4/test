import express from "express"
import { handleAddFood, handleAllFood, handleRemoveFood } from "../controller/foodController.js"
import multer from "multer"

const foodRouter = express.Router()

//image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage:storage})

//add food
foodRouter.post("/add",upload.single("image"),handleAddFood)
foodRouter.get("/list",handleAllFood)
foodRouter.post("/remove",handleRemoveFood)



export default foodRouter