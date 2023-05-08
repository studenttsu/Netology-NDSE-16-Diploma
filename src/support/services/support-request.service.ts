import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { SupportRequest, SupportRequestDocument } from "../models/support-request.model";
import { ISupportRequestService } from "../interfaces/support-request-service.interface";
import { GetChatListParams } from "../interfaces/get-chat-list-params.interface";
import { ISendMessageDto } from "../interfaces/send-message.interface";
import { Message } from "../models/message.model";
import { ID } from "../../core/types";

@Injectable()
export class SupportRequestService implements ISupportRequestService {
    constructor(
        @InjectModel(SupportRequest.name)
        private supportRequestModel: Model<SupportRequestDocument>,
    ) {}

    async findSupportRequests(params: GetChatListParams): Promise<{
        total: number;
        requests: SupportRequest[];
    }> {
        const filter = {
            isActive: params.isActive
        };

        if (params.user) {
            filter['user'] = params.user;
        }

        const total = await this.supportRequestModel.count(filter);

        const requests = await this.supportRequestModel
            .find(filter)
            .skip(params.offset)
            .limit(params.limit);

        return { total, requests };
    }

    async sendMessage(data: ISendMessageDto): Promise<Message> {
        return null;
    }

    async getMessages(supportRequest: ID): Promise<Message[]> {
        return [];
    }

    subscribe(
        handler: (supportRequest: SupportRequest, message: Message) => void,
    ): () => void {
        return () => {};
    }
}
