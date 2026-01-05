import app from "./src/app.js";
import { config } from "./src/config/config.js";
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