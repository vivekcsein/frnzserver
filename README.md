create a folder( name = nodeserver)

//create package.json
pnpm init

//and make type
"type": "module",

//initialise typescript
npm i -g typescript
pnpm tsc --init

changes:-

{
"compilerOptions": {
"target": "ES2020",
"module": "NodeNext",
"moduleResolution": "NodeNext",
"rootDir": "./src",  
 "outDir": "./dist",
"strict": true,  
 }
}

or
//create vanilla ts with vite
and delete all the files
except packagae.json & tsconfg.json
and remove vite from dependency

//create src folder & file name index.ts or frnzserver.ts

// now install dependency
pnpm add express dotenv cors

// now add developer dependency
pnpm add --save-dev @types/express @types/node @types/cors

pnpm add --save-dev typescript nodemon rimraf concurrently

// now your script in package.json will be

    "build": "rimraf dist && pnpm tsc",
    "prestart": "pnpm build",
    "start": "node ./dist/app.js",
    "watch": "pnpm tsc -w",
    "serve": "nodemon ./dist/app.js",
    "dev": "concurrently \"pnpm tsc -w\"  \"nodemon ./dist/app.js\"",

//express app run server

import express, { Express, Response } from "express";
import \* as dotenv from "dotenv";
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
