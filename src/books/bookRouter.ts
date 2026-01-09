import express from "express"
import { addBook, books } from "./bookController.js";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
const bookRouter = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/upload"),
    limits: { 'fileSize': 5 * 1024 * 1024 }
})

bookRouter.post("/", upload.single('image'), addBook);
bookRouter.get("/",books)

export default bookRouter;