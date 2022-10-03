import express, { Express } from 'express';
import dotenv from 'dotenv';
import {resourceRouter} from "./src/routers/resourceRouter"
import { typeRouter } from './src/routers/typeRouter';
import * as bodyParser from "body-parser"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/resource', resourceRouter);
app.use('/type', typeRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});