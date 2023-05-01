import { ID } from '../../core/types';
import { ICreateSupportRequestDto } from './create-support-request.interface';
import { IMarkMessagesAsRead } from './mark-messages-as-read.interface';
import { SupportRequest } from '../models/user.model';
import { Message } from '../models/message.model';

export interface ISupportRequestClientService {
  createSupportRequest(data: ICreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: IMarkMessagesAsRead);
  getUnreadCount(supportRequest: ID): Promise<Message[]>;
}
