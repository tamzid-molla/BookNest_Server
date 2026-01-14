import express from "express"
import { createUser, loginUser, logoutUser, userProfile } from "./userController.js";
const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", userProfile);
userRouter.post("/logout", logoutUser);

export default userRouter