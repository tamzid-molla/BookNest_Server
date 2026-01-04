import express from "express"
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import userRouter from "./users/userRouter.js";

const app = express();

app.get("/", (req, res) => {
    res.json({message:"Server running good"})
})

//Routes
app.use("/api/users", userRouter);

//Error handler middleware
app.use(globalErrorHandler);

export default app;