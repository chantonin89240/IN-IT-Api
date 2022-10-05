import { NextFunction, Request, Response } from "express"
import { Request as RequestTedious } from "tedious"
import {connection} from "../../database/database"
let connexion = connection()
connexion.connect()
import * as webToken from "jsonWebToken"

const secretKey = "f7O0x846zA47N73ph6qZ" // Modify to be anything!

export default class UserService{
    /** Checks for user log-in, and gives them an encrypted connection key if succesful. */
    static Authenticate(request: Request, response : Response){
        console.log("body", request.body)
        var name : string = request.body.username
        //Username encryption is not necessary. // Most likely to guaranteed to be an email adress
        var pass : string = request.body.password
        //Reminder: Password has to be encrypted clientside... Serverside encryption is optional (though recommended).

        // if(CheckSafety(name) && CheckSafety(pass)){
        //     response.status(401).send("Login failed (regex)")  //Prevent SQL injection
        // }
        // else{
            const promise = new Promise((resolve, reject) => {
                var dbRequest : string = "SELECT [Id] FROM [INITDatabase].[dbo].[User] WHERE [User].[Mail] = '"+name+"' AND [User].[Password] = '"+pass+"'"
                console.log(dbRequest)
                const request : RequestTedious = new RequestTedious(dbRequest, (err : any, rowCount : number) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    } else {
                        console.log(rowCount + "rows")
                    }
                })
                
                var result = ""
                request.on("row", (columns) => {
                    result = webToken.sign(columns[0],secretKey,{expiresIn:"12h"})
                    resolve(result)
                    return
                })
                request.on("doneInProc",() => resolve(""))
                connexion.execSql(request)
            })
            promise.then(
                result => {
                    if(result != "")
                        response.status(200).send({message: "Succesfully logged in.",token : result})
                    else
                        response.status(401).send({message: "Login failed(not in db or bad arguments)"})
                }
            )
        //}
    }

    static Verify(req: Request, res: Response, next:NextFunction) {

        var bearerHeader = req.headers["authorization"]
        if(bearerHeader != undefined){
            const token = bearerHeader.split(' ')[1]
            let payload =  webToken.verify(token,secretKey,{maxAge: "12h"}) as webToken.JwtPayload
            if(payload != null){
                console.log(payload)
                var claimedId : number = payload.value
                const promise = new Promise((resolve, reject) => {
                    var dbRequest : string = "SELECT [Id] FROM [INITDatabase].[dbo].[User] WHERE [User].Id = '"+claimedId+"'"
                    console.log(dbRequest)
                    const request : RequestTedious = new RequestTedious(dbRequest, (err : any, rowCount : number) => {
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            console.log(rowCount + "rows")
                        }
                    })
                    request.on("row", (columns) => {    //ID is in fact in Db ==>
                        resolve(claimedId)
                        return
                    })
                    request.on("doneInProc",() => resolve(""))
                    connexion.execSql(request)
                })
                promise.then(
                    result => {
                        if(result != "")
                        {
                            req.body.userId = result
                            next()
                        }
                        else
                        {
                            res.status(403).send({message: "Please log in. (Bad token.)"})
                        }
                    }
                )
            }
        }
        else{
            res.status(401).send("Please log in (Token is missing).")
        }
    }
}


const regex : RegExp = RegExp("([A-Z]|[a-z]|[0-9]|@|.|\-|_)+")
function CheckSafety(i : string){
    return regex.exec(i) != null
}