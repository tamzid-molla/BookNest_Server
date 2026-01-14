import express from "express"
import { createUser, loginUser, userProfile } from "./userController.js";
const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", userProfile);

export default userRouter