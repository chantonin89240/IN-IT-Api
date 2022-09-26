import { Request, Response } from 'express';
import { getResources } from "../../src/service/Resources";


export const getResourcesHandler = (req: Request, res: Response) => {
    res.send(getResources());
};

// export const getResourceHandler = (req: Request, res: Response) => {
//     res.send(getResource(req.params.id));
// };
