import app from "./src/app.ts";
import { config } from "./src/config/config.ts";

const startServer = () => {
    const port = config.port || 3001;

    //Listen
    app.listen(port, () => {
        console.log(`Server listening on ${port}`);
    })
}

startServer();