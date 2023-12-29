
import express, { Express, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();

if (!process.env.SERVER_PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.SERVER_PORT as string, 10) | 7164;

const app: Express = express();
app.use(cors());
app.use(express.json());

//API route
app.get('/', (req, res: Response) => {
    res.send('Hello From Server');
});

// start server
const startserver = async () => {
    try {
        await new Promise((resolve, reject) => {
            const server = app.listen(PORT, () => {
                console.log(`Server running on http://localhost:${PORT}`);
                resolve("server started");
            });
            server.on('error', (error) => {
                reject(error);
            });
        });
    } catch (error) {
        console.error("Server can not start: ", error);
        process.exit(1);
    }
}

startserver();