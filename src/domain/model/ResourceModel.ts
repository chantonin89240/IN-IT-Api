import Option from './OptionModel';
import Booking from './BookingModel';

export default interface Resource {
    id : number;
    name: string;
    description: string;
    picture: string; 
    maxCapacity: number;
    position: string;
    typeId: number;
    typeName : string;
    options : Option[];
    booking : Booking[];
}