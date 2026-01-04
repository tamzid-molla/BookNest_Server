import app from "./src/app.ts";
import { config } from "./src/config/config.ts";
import connectDB from "./src/config/db.js";

const startServer = async() => {
    const port = config.port || 3001;
    //Database connection
    await connectDB();

    //Listen
    app.listen(port, () => {
        console.log(`Server listening on ${port}`);
    })
}

startServer();