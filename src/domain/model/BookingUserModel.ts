export default interface BookingUser {
  IdBooking: number;
  Firstname: string;
  Lastname: string;
  Start: Date;
  End: Date;
  Capacity: number;
  IdResource: number;
  ResourceName: string;
  Description: string;
  Picture: string;
  MaxCapacity: number;
  Position: string;
}
