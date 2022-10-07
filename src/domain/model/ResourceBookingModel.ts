import Booking from "./BookingModel";

export default interface Resources {
  id: number;
  name: string;
  description: string;
  picture: string;
  maxCapacity: number;
  position: string;
  typeId: number;
  typeName: string;
  bookings: Booking[];
}
