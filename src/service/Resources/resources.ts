import type { Response } from "..";
import { list, Resource } from "../../domain/resources";

export const get = (): Response<Resource[]> => {
    const data = list ();
    return {
        status: 200,
        body: data,
    };
};