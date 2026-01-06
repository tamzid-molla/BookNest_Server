import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary.config.js";
import path from "node:path";
import fs from "node:fs"
import bookModel from "./bookModel.js";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title,author,category,description,addedBy } = req.body;
  if(!title||!author||!category||!description) {
      return next(createHttpError(400,"All fields are required"))
  };
  if (!req.file) {
    return next(createHttpError(400, "File are required"));
  };

  try {
    const localFilePath = path.resolve(__dirname, "../../public/data/upload", req.file?.filename);
 //Upload image
  const uploadResult = await cloudinary.uploader.upload(localFilePath, {
    folder: "bookImage",
    resource_type: "image",
  });
    //delete image for local 
    await fs.promises.unlink(localFilePath);
    //add database
    await bookModel.create({
      title,
      author,
      category,
      description,
      addedBy,
      image:uploadResult.secure_url
    });
    
    res.status(201).json({
      message: "Book added successfully",
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "Failed to upload Book"));
  };
};

export { addBook };
