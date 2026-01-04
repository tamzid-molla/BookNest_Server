import express from "express"

const app = express();

app.get("/", (req, res) => {
    res.json({message:"Server running good"})
})

export default app;