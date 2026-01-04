import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password,image } = req.body;
    //validate fields 
    if (!name || !email || !password || !image) {
        const error = createHttpError(400, "All fields are required");
        return next(error)
    }
  res.status(200).json({ message: "User create successfully" });
};

export { createUser };
