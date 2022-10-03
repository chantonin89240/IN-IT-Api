import Resource from "../entities/resource";
import { Request as ExpressRequest, Response } from 'express';
import tedious, {Connection, Request} from 'tedious';


let resources = new Array<Resource>(
  { id : 1, name : "Salle de réunion 1", description : "Cette salle est très grande et spacieuse", image : "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=jpg/path/s398965e309713775/image/ia5d911c472440089/version/1478270869/image.jpg", adress : "18 Boulevard de Verdun", type : "MeetingRoom", capacity : 1},
  { id : 2, name : "Salle de réunion 2", description : "Cette salle est très grande et spacieuse", image : "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=jpg/path/s398965e309713775/image/ia5d911c472440089/version/1478270869/image.jpg", adress : "18 Boulevard de Verdun", type : "MeetingRoom", capacity : 1},
  { id : 3, name : "Salle de réunion 3", description : "Cette salle est très grande et spacieuse", image : "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=jpg/path/s398965e309713775/image/ia5d911c472440089/version/1478270869/image.jpg", adress : "18 Boulevard de Verdun", type : "MeetingRoom", capacity : 5},
  { id : 4, name : "Salle de réunion 4", description : "Cette salle est très grande et spacieuse", image : "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=jpg/path/s398965e309713775/image/ia5d911c472440089/version/1478270869/image.jpg", adress : "18 Boulevard de Verdun", type : "MeetingRoom", capacity : 2},
  { id : 5, name : "Salle de réunion 5", description : "Cette salle est très grande et spacieuse", image : "https://www.createur-entreprise.net/wp-content/uploads/2021/04/salle-reunion.png", adress : "18 Boulevard de Verdun", type : "MeetingRoom", capacity : 1},
  { id : 6, name : "Salle de réunion 6", description : "Cette salle est très grande et spacieuse", image : "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=jpg/path/s398965e309713775/image/ia5d911c472440089/version/1478270869/image.jpg", adress : "18 Boulevard de Verdun", type : "MeetingRoom", capacity : 7}
);

export default class ResourceService{
    
  static getResource(id : number, request : ExpressRequest, response : Response) {
      const resource : Resource = { id : 1, name : "Salle de réunion", description : "Cette salle est très grande et spacieuse", image : "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=jpg/path/s398965e309713775/image/ia5d911c472440089/version/1478270869/image.jpg", adress : "18 Boulevard de Verdun", type : "MeetingRoom", capacity : 7};
      response.status(200).send(resource);
  }

  static createResource(request : ExpressRequest<Resource>, response : Response){
    console.log(request);

    const resource : Resource = request.body;
    resources.push(resource);
    response.status(200).json(resource);
  }

  static getResources(request : ExpressRequest, response : Response){      
    response.status(200).send(resources);
  }
}