import express from "express"
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import userRouter from "./users/userRouter.js";
import bookRouter from "./books/bookRouter.js";

const app = express();
//body parser
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message:"Server running good"})
})

//Routes
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

//Error handler middleware
app.use(globalErrorHandler);

export default app;