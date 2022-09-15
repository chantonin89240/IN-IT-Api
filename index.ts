import express, { Express } from 'express';
import dotenv from 'dotenv';
import {resourceRouter} from "./src/routers/resourceRouter"

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/resource', resourceRouter);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});