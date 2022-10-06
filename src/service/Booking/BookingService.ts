import Booking from "../../domain/model/BookingModel";
import type { Response, Request } from "express";
import { connection } from "../../database/database";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const RequestTedious = require("tedious").Request;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Types = require("tedious").TYPES;

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

export default class BookingService {
  static createBooking(req: Request, response: Response) {
    console.log(req.body);

    const promise = new Promise((resolve, reject) => {
      const requestString =
        "EXEC dbo.createBooking @userId = '" +
        req.body.userId +
        "', @resourceId = '" +
        req.body.resourceId +
        "', @start = '" +
        req.body.start +
        "', @end = " +
        req.body.end +
        ", @capacity = " +
        req.body.capacity +
        "'";
      console.log(requestString);
      const request: typeof RequestTedious = new RequestTedious(
        requestString,
        (err: any, rowCount: number) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(rowCount + "rows");
          }
        }
      );
      const resources: Array<Booking> = new Array<Booking>();
      request.on("row", (columns: any) => {
        resources.push({
          id: columns[0].value,
          userId: columns[1].value,
          resourceId: columns[2].value,
          start: columns[3].value,
          end: columns[4].value,
          capacity: columns[5].value,
        });
      });
      request.on("requestCompleted", () => {
        resolve(resources);
      });
      connexion.execSql(request);
    });
    promise.then((result) => {
      response.status(200).send(result);
    });
  }
}
