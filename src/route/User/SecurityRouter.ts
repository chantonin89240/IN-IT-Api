// Imports
import express, { Router } from "express";
import UserService from "../../service/User/UserService";

export const userRouter: Router = express.Router();
export const Securize = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => UserService.Verify(req, res, next);

userRouter.post("", (req, res) => UserService.Authenticate(req, res));
