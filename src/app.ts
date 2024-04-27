import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

function app(init: (app: Express) => void): void {
  const envPath = path.join(process.cwd(), "/.env");
  dotenv.config({ path: envPath });

  const port = process.env.PORT;
  const app = express();

  app.use(bodyParser.json());
  app.use(cookieParser());

  init(app);

  app.listen(port, async () => {
    await connectDB();
    console.log(`Server running on port ${port}...`);
  });
}

export default app;
