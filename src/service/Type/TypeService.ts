import Type from "../../domain/model/TypeModel";
import type { Response, Request } from "express";
import { connection } from "../../constants/database";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const RequestTedious = require("tedious").Request;

const connexion = connection();
connexion.connect();

connexion.on("connect", function (err: any) {
  if (err) {
    console.log("Error: ", err);
  } else {
    // If no error, then good to go...
    console.log("Connection established");
  }
});

export default class TypeService {
  static getTypes(request: Request, response: Response) {
    const promise = new Promise((resolve, reject) => {
      const request: typeof RequestTedious = new RequestTedious(
        "SELECT Id, Name FROM dbo.getType(-1)",
        (err: any, rowCount: number) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(rowCount + "rows");
          }
        }
      );
      const types: Array<Type> = new Array<Type>();
      request.on("row", (columns: any) => {
        types.push({
          id: columns[0].value,
          name: columns[1].value,
        });
      });
      request.on("requestCompleted", () => {
        resolve(types);
      });
      connexion.execSql(request);
    });
    promise.then((result) => {
      response.status(200).send(result);
    });
  }
}
