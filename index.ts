import express, { Express, Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import * as securityRouter from "./src/route/User/SecurityRouter";
import { resourcesRouter } from "./src/route/Resouces/ResourcesRouter";
import { resourceRouter } from "./src/route/Resouces/ResourceRouter";
import { typeRouter } from "./src/route/Types/TypeRouter";
import { optionRouter } from "./src/route/Option/OptionRouter";

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = 3000;

// Data acquirement routes go here. These will be secure.
app.use(urlencoded({ extended: true }));
app.get("", (req: Request, res: Response) =>
  res.send({ message: "In-It API is responsive!" })
);
// Security functions. Comment and uncomment as needed for testing.
// Remember to uncomment and test routes. Tokens last 12 hours.
app.use("/login", securityRouter.Routes);
app.use(securityRouter.Securize); //This ensures token presence for routes below.

// Data acquirement routes go here. These will be secure.
app.use("/resources", resourcesRouter);
app.use("/types", typeRouter);
app.use("/options", optionRouter);
app.use("/resource", resourceRouter);

app.listen(port, () => {
  console.log(`⚡︝[server]: Server is running at http://localhost:${port}`);
});
