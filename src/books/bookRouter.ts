import express from "express"
import { addBook } from "./bookController.js";
const bookRouter = express.Router();

bookRouter.post("/",addBook)

export default bookRouter;