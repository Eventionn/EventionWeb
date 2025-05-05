export interface UserInEvent {
    ticketID: string;
    event_id: string;
    userId: string;
    feedback_id?: string;
    createdAt: Date;
    participated: boolean;
}
