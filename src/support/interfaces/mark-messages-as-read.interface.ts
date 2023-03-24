import { ID } from "../../core/types";

export interface IMarkMessagesAsRead {
    user: ID;
    supportRequest: ID;
    createdBefore: Date;
}