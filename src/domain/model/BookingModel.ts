import Worker from './WorkerModel';

export default interface Booking {
    id : number,
    resourceId : number,
    start: Date,
    end: Date,
    capacity : number,
    worker : Worker,
}