import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { SupportRequest, SupportRequestDocument } from "../models/support-request.model";
import { ISupportRequestService } from "../interfaces/support-request-service.interface";
import { GetChatListParams } from "../interfaces/get-chat-list-params.interface";
import { ISendMessageDto } from "../interfaces/send-message.interface";
import { Message, MessageDocument } from "../models/message.model";
import { ID } from "../../core/types";
import { ISupportRequestClientService } from "../interfaces/support-request-client-service.interface";
import { ICreateSupportRequestDto } from "../interfaces/create-support-request.interface";
import { IMarkMessagesAsRead } from "../interfaces/mark-messages-as-read.interface";

@Injectable()
export class SupportRequestClientService implements ISupportRequestClientService {
    constructor(
        @InjectModel(Message.name)
        private messageModel: Model<MessageDocument>,
        @InjectModel(SupportRequest.name)
        private supportRequestModel: Model<SupportRequestDocument>,
    ) {}

    async createSupportRequest(
        data: ICreateSupportRequestDto,
    ): Promise<SupportRequest> {
        const message = await this.messageModel.create({
            author: data.user,
            text: data.text
        })

        return this.supportRequestModel.create({
            user: data.user,
            messages: [message]
        });
    }

    markMessagesAsRead(params: IMarkMessagesAsRead) {}

    async getUnreadCount(supportRequest: ID): Promise<Message[]> {
        return [];
    }
}
