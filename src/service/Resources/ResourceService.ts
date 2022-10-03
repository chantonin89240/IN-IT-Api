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
            const request : typeof RequestTedious = new RequestTedious("SELECT Id, Name, Description, Picture, TypeId, MaxCapacity, Position  FROM Resource", (err : any, rowCount : number) => {
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
                typeId : columns[4].value,
                maxCapacity : columns[5].value,
                position : columns[6].value,
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
