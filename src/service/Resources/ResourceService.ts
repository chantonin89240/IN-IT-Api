import Resources from "../../domain/model/ResourcesModel";
import Resource from "../../domain/model/ResourceModel";
import ResourceBooking from "../../domain/model/ResourceBookingModel";
import Option from "../../domain/model/OptionModel";
import Booking from "../../domain/model/BookingModel";
import type { Response, Request } from "express";
import { connection } from "../../database/database";

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { Request as RequestTedious, TYPES as Types } from "tedious";

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

export default class ResourceService {
  static getResources(request: Request, response: Response) {
    const promise = new Promise((resolve, reject) => {
      const requestResource: RequestTedious = new RequestTedious(
        "select Id, Name, Description, Picture, MaxCapacity, Position, TypeId, TypeName from dbo.getResource(-1)",
        (err: any, rowCount: number) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(rowCount + "rows");
          }
        }
      );
      const resources: Array<ResourceBooking> = new Array<ResourceBooking>();

      const requestBooking: RequestTedious = new RequestTedious(
        "select Id, name, resourceId, [Start], [End], Capacity from dbo.getBooking(-1)",
        (err: Error, rowCount: number) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(rowCount + "rows");
          }
        }
      );
      const booking: Array<Booking> = new Array<Booking>();
      requestBooking.on("row", (columns: Array<any>) => {
        booking.push({
          id: columns[0].value,
          userName: columns[1].value,
          resourceId: columns[2].value,
          start: columns[3].value,
          end: columns[4].value,
          capacity: columns[5].value,
        });
      });

      requestResource.on("row", (columns: Array<any>) => {
        resources.push({
          id: columns[0].value,
          name: columns[1].value,
          description: columns[2].value,
          picture: columns[3].value,
          maxCapacity: columns[4].value,
          position: columns[5].value,
          typeId: columns[6].value,
          typeName: columns[7].value,
          booking: booking.filter(
            (book) => book.resourceId == columns[0].value
          ),
        });
      });
      requestBooking.on("requestCompleted", () => {
        connexion.execSql(requestResource);
      });
      requestResource.on("requestCompleted", () => {
        resolve(resources);
      });
      connexion.execSql(requestBooking);
    });
    promise.then((result) => {
      response.status(200).send(result);
    });
  }

  static createResource(req: Request, response: Response) {
    console.log(req.body);

    const promise = new Promise((resolve, reject) => {
      const requestString =
        "EXEC dbo.createResource @name = '" +
        req.body.name +
        "', @description = '" +
        req.body.description +
        "', @Picture = '" +
        req.body.picture +
        "', @typeId = " +
        req.body.typeId +
        ", @maxCapacity = " +
        req.body.maxCapacity +
        ", @position = '" +
        req.body.position +
        "'";
      console.log(requestString);
      const request: RequestTedious = new RequestTedious(
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
      const resources: Array<Resources> = new Array<Resources>();
      request.on("row", (columns: any) => {
        resources.push({
          id: columns[0].value,
          name: columns[1].value,
          description: columns[2].value,
          picture: columns[3].value,
          maxCapacity: columns[4].value,
          position: columns[5].value,
          typeId: columns[6].value,
          typeName: columns[7].value,
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

  // service de récupération d'une ressource ainsi que de sont type, options et réservation
  static getResource(request: Request, response: Response) {
    const promise = new Promise((resolve, reject) => {
      const requestResource: RequestTedious = new RequestTedious(
        "select Name, Description, Picture, MaxCapacity, Position, TypeId, TypeName from dbo.getResource(@Id)",
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
      requestResource.addParameter("Id", Types.Int, id);

      const requestOption: RequestTedious = new RequestTedious(
        "select Id, Name, Quantity from dbo.getOption(@Id)",
        (err: any, rowCount: number) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(rowCount + "rows");
          }
        }
      );
      requestOption.addParameter("Id", Types.Int, id);

      const requestBooking: RequestTedious = new RequestTedious(
        "select Id, name, [Start], [End], Capacity from dbo.getBooking(@Id)",
        (err: any, rowCount: number) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(rowCount + "rows");
          }
        }
      );
      requestBooking.addParameter("Id", Types.Int, id);

      const option: Array<Option> = new Array<Option>();

      requestOption.on("row", (columns: any) => {
        option.push({
          id: columns[0].value,
          name: columns[1].value,
          quantity: columns[2].value,
        });
      });

      const booking: Array<Booking> = new Array<Booking>();

      requestBooking.on("row", (columns: any) => {
        booking.push({
          id: columns[0].value,
          userName: columns[1].value,
          resourceId: id,
          start: columns[2].value,
          end: columns[3].value,
          capacity: columns[4].value,
        });
      });
      let resource: Resource;

      requestResource.on("row", (columns: any) => {
        resource = {
          id: id,
          name: columns[0].value,
          description: columns[1].value,
          picture: columns[2].value,
          maxCapacity: columns[3].value,
          position: columns[4].value,
          typeId: columns[5].value,
          typeName: columns[6].value,
          options: option,
          bookings: booking,
        };
      });

      requestResource.on("requestCompleted", () => {
        resolve(resource);
      });

      requestOption.on("requestCompleted", () => {
        connexion.execSql(requestBooking);
      });

      requestBooking.on("requestCompleted", () => {
        connexion.execSql(requestResource);
      });

      connexion.execSql(requestOption);
    });
    promise.then((result) => {
      response.status(200).send(result);
    });
  }
}
