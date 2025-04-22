import { AddressEvent } from "./AddressEvent";
import { EventStatus } from "./EventStatus";

export interface Event {
    eventID: string;
    userId: string;
    name: string;
    description: string;
    startAt: Date;
    endAt: Date;
    price: number;
    createdAt: Date;
    eventStatus: EventStatus;
    addressEvents: AddressEvent;
    eventPicture?: string;
}
