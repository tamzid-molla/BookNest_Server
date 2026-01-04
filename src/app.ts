import express from "express"
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

const app = express();

app.get("/", (req, res) => {
    res.json({message:"Server running good"})
})

app.use(globalErrorHandler);

export default app;