export interface UserInEvent {
    ticketID: string;
    eventID: string;
    userId: string;
    feedback_id?: string;
    createdAt: Date;
    participated: boolean;
}
