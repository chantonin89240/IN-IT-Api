import Option from "../../domain/model/OptionModel";
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

export default class OptionService {
  // service qui récupère les options
  static getOptions(request: Request, response: Response) {
    const promise = new Promise((resolve, reject) => {
      const request: typeof RequestTedious = new RequestTedious(
        "select Id, Name, Quantity from dbo.getOption(-1)",
        (err: any, rowCount: number) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(rowCount + "rows");
          }
        }
      );
      const options: Array<Option> = new Array<Option>();
      request.on("row", (columns: any) => {
        options.push({
          id: columns[0].value,
          name: columns[1].value,
          quantity: columns[2].value,
        });
      });
      request.on("requestCompleted", () => {
        resolve(options);
      });
      connexion.execSql(request);
    });
    promise.then((result) => {
      response.status(200).send(result);
    });
  }
}
