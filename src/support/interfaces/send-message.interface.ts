import { ID } from '../../core/types';

export interface ISendMessageDto {
    author: ID;
    supportRequest: ID;
    text: string;
}
