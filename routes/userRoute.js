import express from "express"
import { handleLogin,handleRegisterUser } from "../controller/user.controller.js"

const userRouter = express.Router()

userRouter.post("/register",handleRegisterUser,)
userRouter.post("/login",handleLogin)


export default userRouter
