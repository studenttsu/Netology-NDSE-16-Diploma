import { ID } from "../../common/types";

export interface ISendMessageDto {
    author: ID;
    supportRequest: ID;
    text: string;
}