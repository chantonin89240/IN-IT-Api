import { request, response } from 'express';
import { GetResources } from "../service/Resources/resources";

(req: Request, res: Response) => {
    res.Send(getResources());
}