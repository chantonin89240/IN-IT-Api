import { NextFunction, Request, Response } from "express";
import { Request as RequestTedious } from "tedious";
import { connection } from "../../constants/database";

const connexion = connection();
connexion.connect();
import * as webToken from "jsonWebToken";

const secretKey = "f7O0x846zA47N73ph6qZ"; // Modify to be anything!

export default class UserService {
  /** Checks for user log-in, and gives them an encrypted connection key if succesful. */
  static Authenticate(request: Request, response: Response) {
    console.log("body", request.body);
    const name: string = request.body.username;
    //Username encryption is not necessary. // Most likely to guaranteed to be an email adress
    const pass: string = request.body.password;
    //Reminder: Password has to be encrypted clientside... Serverside encryption is optional (though recommended).

    if (CheckIsInjecting(name) || CheckIsInjecting(pass)) {
      response.status(401).send("Login failed (regex // Injecting)"); //Prevent SQL injection
    } else {
      const promise = new Promise((resolve, reject) => {
        const dbRequest: string =
          "SELECT Id, FirstName, LastName, Name from dbo.getUser('" +
          name +
          "', '" +
          pass +
          "')";
        console.log(dbRequest);
        const request: RequestTedious = new RequestTedious(
          dbRequest,
          (err: any, rowCount: number) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              console.log(rowCount + "rows");
            }
          }
        );
        let result: object = {};
        request.on("row", (columns) => {
          result = {
            token: webToken.sign(columns[0], secretKey, { expiresIn: "12h" }),
            userData: {
              firstName: columns[1].value,
              lastName: columns[2].value,
              isAdmin: columns[3].value == "Administrateur",
            },
          };
          resolve(result);
          return;
        });
        request.on("doneInProc", () => resolve(""));
        connexion.execSql(request);
      });
      promise.then((result) => {
        if (result != "")
          response
            .status(200)
            .send({ message: "Succesfully logged in.", data: result });
        else
          response
            .status(401)
            .send({ message: "Login failed(not in db or bad arguments)" });
      });
    }
  }

  static Verify(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader != undefined) {
      const token = bearerHeader.split(" ")[1];
      const payload = webToken.verify(token, secretKey, {
        maxAge: "12h",
      }) as webToken.JwtPayload;
      if (payload != null) {
        // console.log(payload);
        const claimedId: string = payload.value;
        if (CheckIsInjecting(claimedId)) {
          res.status(401).send({ message: "Please log in. (bad token)" });
        }
        const promise = new Promise((resolve, reject) => {
          const dbRequest: string =
            "SELECT Id FROM dbo.verifUser(" + claimedId + ")";
          // console.log(dbRequest);
          const request: RequestTedious = new RequestTedious(
            dbRequest,
            (err: any, rowCount: number) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                console.log(rowCount + "rows");
              }
            }
          );
          request.on("row", () => {
            //ID is in fact in Db ==>
            resolve(claimedId);
            return;
          });
          request.on("doneInProc", () => resolve(""));
          connexion.execSql(request);
        });
        promise.then((result) => {
          if (result != "") {
            req.body.userId = result;
            next();
          } else {
            res.status(403).send({ message: "Please log in. (Bad token.)" });
          }
        });
      }
    } else {
      res.status(401).send("Please log in (Token is missing).");
    }
  }
}

const regex = /'/; //Checks for attempts to break out of "This is a raw value" declarators for SQL.
function CheckIsInjecting(i: string) {
  const result = regex.test(i);
  console.log("Run regex on : " + i + "  // Returned " + result);
  return result;
}
