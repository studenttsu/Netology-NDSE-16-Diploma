import { ID } from "../../common/types";

export interface IMarkMessagesAsRead {
    user: ID;
    supportRequest: ID;
    createdBefore: Date;
}