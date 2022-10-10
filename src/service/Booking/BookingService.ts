import Booking from "../../domain/model/BookingModel";
import BookingUser from "../../domain/model/BookingUserModel";
import type { Response, Request } from "express";
import { connection } from "../../constants/database";
import { getTokenContent } from "../../constants/bearer";

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
    const tokenContent = getTokenContent(req, response);
    const promise = new Promise((resolve, reject) => {
      const requestString =
        "EXEC dbo.createBooking @userId = " +
        tokenContent +
        ", @resourceId = " +
        req.body.resourceId +
        ", @start = '" +
        req.body.start +
        "', @end = '" +
        req.body.end +
        "', @capacity = " +
        req.body.capacity +
        "";
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
        "select Id, Name, resourceId, Start, [End], Capacity from dbo.getBooking(@Id)",
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

  static getBookingByUser(request: Request, response: Response) {
    const tokenContent = getTokenContent(request, response);
    const promise = new Promise((resolve, reject) => {
      const requestBooking: typeof RequestTedious = new RequestTedious(
        "select IdBooking, Firstname, Lastname,  [Start], [End], Capacity, IdResource, ResourceName, Description, Picture,	MaxCapacity, Position from dbo.getBookingInDate(@Id)",
        (err: any, rowCount: number) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(rowCount + "rows");
          }
        }
      );
      requestBooking.addParameter("Id", Types.Int, tokenContent);
      const BookingUser: Array<BookingUser> = new Array<BookingUser>();
      requestBooking.on("row", (columns: any) => {
        BookingUser.push({
          IdBooking: columns[0].value,
          Firstname: columns[1].value,
          Lastname: columns[2].value,
          Start: columns[3].value,
          End: columns[4].value,
          Capacity: columns[5].value,
          IdResource: columns[6].value,
          ResourceName: columns[7].value,
          Description: columns[8].value,
          Picture: columns[9].value,
          MaxCapacity: columns[10].value,
          Position: columns[11].value,
        });
      });
      requestBooking.on("requestCompleted", () => {
        resolve(BookingUser);
      });
      connexion.execSql(requestBooking);
    });
    promise.then((result) => {
      response.status(200).send(result);
    });
  }
}
