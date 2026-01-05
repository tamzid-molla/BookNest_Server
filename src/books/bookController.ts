import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const addBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title,author,category,image,description,addedBy } = req.body;
    if(!title||!author||!category||!image||!description||!addedBy||!addedBy.name || !addedBy.email) {
        return next(createHttpError(400,"All fields are required"))
    };
    res.status(201).json({
        message: "Book added successfully"
    });
}

export {addBook}