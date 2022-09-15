import Resource from "../entities/resource";
import { Request as ExpressRequest, Response } from 'express';
import tedious, {Connection, Request} from 'tedious';


let resources = new Array<Resource>(
  { id : 1, name : "Salle de réunion 1", description : "Cette salle est très grande et spacieuse"},
  { id : 2, name : "Salle de réunion 2", description : "Cette salle est très grande et spacieuse"},
  { id : 3, name : "Salle de réunion 3", description : "Cette salle est très grande et spacieuse"},
  { id : 4, name : "Salle de réunion 4", description : "Cette salle est très grande et spacieuse"},
  { id : 5, name : "Salle de réunion 5", description : "Cette salle est très grande et spacieuse"},
  { id : 6, name : "Salle de réunion 6", description : "Cette salle est très grande et spacieuse"}
);

export default class ResourceService{
    
  static getResource(id : number, request : Request, response : Response) {
      const resource : Resource = { id : 1, name : "Salle de réunion", description : "Cette salle est très grande et spacieuse"};
      response.status(200).send(resource);
  }

  static createResource(request : ExpressRequest<Resource>, response : Response){
    console.log(request);

    const resource : Resource = request.body;
    resources.push(resource);
    response.status(200).json(resource);
  }

  static getResources(request : Request, response : Response){      
    response.status(200).send(resources);
  }
}