import { Request as ExpressRequest, Response } from 'express'
import Type from '../entities/type'

let types = new Array<Type>(
    {id:0, name:"Salle de réunion"},
    {id:1, name:"Salle de pause"},
    {id:2, name:"Salle d'ordinateurs"},
    {id:3, name:"Terrain de foot"}
)

export default class TypeService{
    static getTypes(req : ExpressRequest,res : Response){res.status(200).send(types)}
    
    static createType(request:ExpressRequest<string>, res:Response){
        var newType:Type = {id: types.length, name:request.body["name"]}
        types.push(newType)
        res.status(200).send(newType)
    }
}