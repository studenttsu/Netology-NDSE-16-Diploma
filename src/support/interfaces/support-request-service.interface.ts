import { GetChatListParams } from './get-chat-list-params.interface';
import { ID } from '../../core/types';
import { ISendMessageDto } from './send-message.interface';
import { SupportRequest } from '../models/support-request.model';
import { Message } from '../models/message.model';
import { PageDto } from "../../core/pagination/PageDto";

export interface ISupportRequestService {
    findSupportRequests(params: GetChatListParams): Promise<{
        total: number;
        requests: SupportRequest[];
    }>;
    sendMessage(data: ISendMessageDto): Promise<Message>;
    getMessages(supportRequest: ID): Promise<Message[]>;
    subscribe(
        handler: (supportRequest: SupportRequest, message: Message) => void,
    ): () => void;
}
