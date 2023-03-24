import { ID } from "../../common/types";

export interface ICreateSupportRequestDto {
    user: ID;
    text: string;
}