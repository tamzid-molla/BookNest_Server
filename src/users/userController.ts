import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "./userModel.js";
import { config } from "../config/config.js";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, image } = req.body;
  //validate fields
  if (!name || !email || !password || !image) {
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
      image,
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
    const user = await userModel.findOne({ email });
    if (!user) {
        return next(createHttpError(404,"User not found"))
    };
    //match password 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(createHttpError(400,"Email or Password wrong"))
    }
    //generate token
    const token = jwt.sign({ sub: user._id }, config.jwt as string, { expiresIn: "7d" });
    res.status(200).json({
        _id: user._id,
        token,
        message:"Login successfully"
    })
    } catch (error) {
        next(error)
    }
}

export { createUser ,loginUser};
