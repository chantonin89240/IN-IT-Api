import type { Response } from "../types";
import { listResource,  Resource } from "../../domain/resources";

export const getResources = (): Response<Resource[]> => {
    const data = listResource();
    return {
        status: "200",
        body: data,
    };
};

// export const getResource = ( requestId : string): Response<Resource> | Record<string, string> => {
//     const resourceId = parseInt(requestId);
//     const data = findResource(resourceId) || {};
//     return {
//         status: "200",
//         body: data,
//     };
// };
