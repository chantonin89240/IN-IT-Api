"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResourcesHandler = void 0;
const Resources_1 = require("../../src/service/Resources");
const getResourcesHandler = (req, res) => {
    res.send((0, Resources_1.getResources)());
};
exports.getResourcesHandler = getResourcesHandler;
// export const getResourceHandler = (req: Request, res: Response) => {
//     res.send(getResource(req.params.id));
// };
