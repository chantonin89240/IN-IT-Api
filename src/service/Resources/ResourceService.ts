import {Resource} from "../../domain/model/ResourceModel";
import type { Response, Request } from "express";
import {connection} from "../../database/database";

var RequestTedious = require('tedious').Request;

var connexion = connection();
connexion.connect();

connexion.on('connect', function(err: any) {
  if(err) {
    console.log('Error: ', err)
  }
  else { 
    // If no error, then good to go...
    console.log('Connection established')
  }
});


export default class ResourceService{
    static getResources(request : Request, response : Response) {
        const promise = new Promise((resolve, reject) => {
            const request : typeof RequestTedious = new RequestTedious("SELECT [Resource].Id, [Resource].Name, Description, Picture, MaxCapacity, Position, [Type].Id AS TypeId, [Type].Name AS TypeName FROM Resource INNER JOIN Type ON Type.Id = Resource.TypeId", (err : any, rowCount : number) => {
              if (err) {
                console.log(err)
                reject(err)
              } else {
                console.log(rowCount + "rows")
              }
            })
            const resources : Array<Resource> = new Array<Resource>
            request.on("row", (columns:any) => {
              resources.push({
                id : columns[0].value,
                name : columns[1].value,
                description : columns[2].value,
                picture : columns[3].value,
                maxCapacity : columns[4].value,
                position : columns[5].value,
                typeId : columns[6].value,
                typeName : columns[7].value,
              })
            })
            request.on("requestCompleted", () => {
              resolve(resources)
            })
            connexion.execSql(request)
          })
          promise.then(
            (result) => {
                response.status(200).send(result)
            })
      }

      static createResource(req : Request, response : Response)
      {
        console.log(req.body);
        
        const promise = new Promise((resolve, reject) => {
          var requestString  = "insert into Resource (Name, Description, Picture, TypeId, MaxCapacity, Position) values ('" + req.body.name + "', '"+ req.body.description +"', '" + req.body.picture + "', " + req.body.typeId + ", " + req.body.maxCapacity +", '" + req.body.position + "');";
          console.log(requestString);
          const request : typeof RequestTedious = new RequestTedious(requestString, (err : any, rowCount : number) => {
            if (err) {
              console.log(err)
              reject(err)
            } else {
              console.log(rowCount + "rows")
            }
          })
          const resources : Array<Resource> = new Array<Resource>
          request.on("row", (columns:any) => {
            resources.push({
              id : columns[0].value,
              name : columns[1].value,
              description : columns[2].value,
              picture : columns[3].value,
              maxCapacity : columns[4].value,
              position : columns[5].value,
              typeId : columns[6].value,
              typeName : columns[7].value,
            })
          })
          request.on("requestCompleted", () => {
            resolve(resources)
          })
          connexion.execSql(request)
        })
        promise.then(
          (result) => {
              response.status(200).send(result)
          })
      }
}
