import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "./userModel.js";
import { config } from "../config/config.js";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, } = req.body;
  //validate fields
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  try {
    //check user exists
    const user = await userModel.findOne({ email: email });
    if (user) {
      const error = createHttpError(400, "User already exists in this email");
      return next(error);
    }
    //password hashed
    const hashedPassword = await bcrypt.hash(password, 10);
    //create user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    //generate token
    const token = jwt.sign({ sub: newUser._id }, config.jwt as string, { expiresIn: "7d" });

    res.status(201).json({
      _id: newUser._id,
      token,
      message: "User create successfully",
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
    if (!email || !password) {
        return next(createHttpError(400,"All fields are required"))
    };
    try {
        //user exists or not 
      const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return next(createHttpError(404,"User not found"))
      };
    //match password 
      const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
        return next(createHttpError(400,"Email or Password wrong"))
      }
      //create payload 
      const payload: {
        email: string;
        role: string;
      } = {
        email: user.email,
        role:user.role,
      }
    //generate token
      const token = jwt.sign(payload, config.jwt as string, { expiresIn: "7d" });
    
    res
  .cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  .status(200)
  .json({
    _id: user._id,
    name: user.name,
    email: user.email,
    message: "Login successfully",
  });
    } catch (error) {
      console.log(error);
        next(error)
    }
}

const userProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return res.status(401).json({message:"Not authenticated"})
    };
    //verify 
    const decoded = jwt.verify(token, config.jwt as string) as { email: string, role: string };
    //find user 
    const user = await userModel.findOne({ email: decoded?.email });
    if(!user) return res.status(404).json({message:"User not found"})
    
    res.status(200).json(user);
  } catch (error) {
    next(error)
  }

} 

export { createUser ,loginUser,userProfile};
