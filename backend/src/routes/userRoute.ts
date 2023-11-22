import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/userController.js";
import {loginValidator, signupValidator, validate} from "../utils/validators.js"

const userRoutes = Router();

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup",validate(signupValidator) ,userSignup)
userRoutes.post("/login",loginValidator,userLogin)

export default userRoutes;