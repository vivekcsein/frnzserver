<p>
create a folder( name = nodeserver
</p>

<p>
//create package.json
</p>
       
       pnpm init
<p>
//and make type
</p>

       "type": "module",
<p>
//initialize typescript
</p>

     npm i -g typescript
     pnpm tsc --init
<p>
changes commit to tsconfig.json:-
</p>

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

<p>
create .gitignore
</p>

    /node_modules
    /dist/
    /build
    .env
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*
  
<p>
//create src folder & file name app.ts or frnzserver.ts
</p>
<p>
// now install dependency
</p>

    pnpm add express dotenv cors
<p>
// now add developer dependency
</p>

    pnpm add --save-dev @types/express @types/node @types/cors
    pnpm add --save-dev typescript nodemon rimraf concurrently

<p>
// now your script in package.json will be
</p>

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
