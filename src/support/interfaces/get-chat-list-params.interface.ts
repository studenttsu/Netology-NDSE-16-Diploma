import { ID } from "../../common/types";

export interface GetChatListParams {
    user: ID | null;
    isActive: boolean;
}