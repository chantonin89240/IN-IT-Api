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
        "EXEC dbo.createBooking @userId = 1, @resourceId = '" +
        req.body.resourceId +
        "', @start = '" +
        req.body.start +
        "', @end = " +
        req.body.end +
        ", @capacity = " +
        req.body.capacity +
        "'";
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
      const booking: Array<Booking> = new Array<Booking>();
      request.on("row", (columns: any) => {
        booking.push({
          id: columns[0].value,
          userName: columns[1].value,
          resourceId: columns[2].value,
          start: columns[3].value,
          end: columns[4].value,
          capacity: columns[5].value,
        });
      });
      request.on("requestCompleted", () => {
        resolve(booking);
      });
      connexion.execSql(request);
    });
    promise.then((result) => {
      response.status(200).send(result);
    });
  }

  static getBookingById(request: Request, response: Response) {
    const promise = new Promise((resolve, reject) => {
      const requestBooking: typeof RequestTedious = new RequestTedious(
        "select Id, Name, resourceId, Start, [End], Capacity from dbo.getBookingInDate(@Id)",
        (err: any, rowCount: number) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(rowCount + "rows");
          }
        }
      );
      const id = parseInt(request.params.id);
      requestBooking.addParameter("Id", Types.Int, id);

      console.log("test test " + id);
      const booking: Array<Booking> = new Array<Booking>();
      requestBooking.on("row", (columns: any) => {
        booking.push({
          id: columns[0].value,
          userName: columns[1].value,
          resourceId: columns[2].value,
          start: columns[3].value,
          end: columns[4].value,
          capacity: columns[5].value,
        });
      });
      requestBooking.on("requestCompleted", () => {
        resolve(booking);
      });
      connexion.execSql(requestBooking);
    });
    promise.then((result) => {
      response.status(200).send(result);
    });
  }
}
