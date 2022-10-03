import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {resourceRouter} from "./src/route/Resouces/ResourceRouter";
import {typeRouter} from "./src/route/Types/TypeRouter";

dotenv.config();

const app: Express = express();

const port = 3000;

app.get("", (req: Request, res: Response) => res.send());
app.use("/resources", resourceRouter);
app.use("/types", typeRouter)
//app.get("/resource/:id", getResourceHandler)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});