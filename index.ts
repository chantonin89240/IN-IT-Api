import express, { Express, Request, Response, urlencoded } from 'express';
import dotenv from 'dotenv';
import {resourcesRouter} from "./src/route/Resouces/ResourcesRouter";
import {resourceRouter} from "./src/route/Resouces/ResourceRouter";
import {typeRouter} from "./src/route/Types/TypeRouter";
import {optionRouter} from "./src/route/Option/OptionRouter"
import UserService from "./src/service/User/UserService"

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = 3000;

app.use(urlencoded({extended:true}))
app.get("", (req: Request, res: Response) => res.send({message : "In-It API is responsive!"}))
  
  // Security functions. Comment and uncomment as needed for testing. 
  // Remember to uncomment and test routes. Tokens last 12 hours.
app.post("/login", (req, res) => UserService.Authenticate(req, res))
app.use((req, res, next) => UserService.Verify(req, res, next))

  // Data acquirement routes go here. These will be secure.
app.get("", (req: Request, res: Response) => res.send());
app.use("/resources", resourcesRouter);
app.use("/types", typeRouter)
app.use("/options", optionRouter)
app.use("/resource", resourceRouter)

app.listen(port, () => {
  console.log(`⚡︝[server]: Server is running at http://localhost:${port}`);
});