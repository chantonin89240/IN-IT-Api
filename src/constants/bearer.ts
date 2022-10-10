import type { Response, Request } from "express";
import * as webToken from "jsonwebtoken";

const secretKey = "f7O0x846zA47N73ph6qZ"; // Modify to be anything!

export const getTokenContent = (
  request: Request,
  _response: Response
): number => {
  const bearerHeader = request.headers["authorization"];
  if (bearerHeader != undefined) {
    const token = bearerHeader.split(" ")[1];
    const payload = webToken.verify(token, secretKey, {
      maxAge: "12h",
    }) as webToken.JwtPayload;
    const claimedId: string = payload.value;
    return parseInt(claimedId, 10);
  } else {
    return -1;
  }
};
