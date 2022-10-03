export default interface Booking {
    id : number,
    userId : number,
    resourceId : number,
    start: Date,
    end: Date,
    capacity : number
}