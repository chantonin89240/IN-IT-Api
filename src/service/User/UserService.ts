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

        if(CheckIsInjecting(name) || CheckIsInjecting(pass)){
            response.status(401).send("Login failed (regex // Injecting)")  //Prevent SQL injection
        }
        else{
            const promise = new Promise((resolve, reject) => {
                var dbRequest : string =  "SELECT [User].Id, [User].FirstName, [User].LastName, UT.Name "
                    dbRequest         +=  "FROM [INITDatabase].[dbo].[User] "
                    dbRequest         +=  "JOIN [UserType] as UT "
                    dbRequest         +=  "ON UT.Id = [User].UserTypeId "
                    dbRequest         +=  "WHERE [User].[Mail] = '"+name+"' AND [User].[Password] = '"+pass+"'"
                console.log(dbRequest)
                const request : RequestTedious = new RequestTedious(dbRequest, (err : any, rowCount : number) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    } else {
                        console.log(rowCount + "rows")
                    }
                })
                
                var result : object = {}
                request.on("row", (columns) => {
                    result = {
                        token : webToken.sign(columns[0],secretKey,{expiresIn:"12h"}),
                        userData : {
                            firstName : columns[1].value,
                            lastName : columns[2].value,
                            isAdmin : columns[3].value == "Administrateur"
                        }
                    }


                    resolve(result)
                    return
                })
                request.on("doneInProc",() => resolve(""))
                connexion.execSql(request)
            })
            promise.then(
                result => {
                    if(result != "")
                        response.status(200).send({message: "Succesfully logged in.",data : result})
                    else
                        response.status(401).send({message: "Login failed(not in db or bad arguments)"})
                }
            )
        }
    }

    static Verify(req: Request, res: Response, next:NextFunction) {

        var bearerHeader = req.headers["authorization"]
        if(bearerHeader != undefined){
            const token = bearerHeader.split(' ')[1]
            let payload =  webToken.verify(token,secretKey,{maxAge: "12h"}) as webToken.JwtPayload
            if(payload != null){
                console.log(payload)
                var claimedId : string = payload.value
                if(CheckIsInjecting(claimedId)){
                    res.status(401).send({message: "Please log in. (bad token)"})
                }
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


const regex : RegExp = /'/              //Checks for attempts to break out of "This is a raw value" declarators for SQL.
function CheckIsInjecting(i : string){
    var result = regex.test(i)
    console.log("Run regex on : "+i+"  // Returned "+result)
    return result
}