import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {resourceRouter} from "./src/routers/resourceRouter"

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.get('/', (req: Request, res: Response) => {
  res.send('c + TypeScript Server');
});

app.get('/resource', resourceRouter);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});