import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Message } from './message.model';
import { ID } from "../../core/types";
import { User } from "../../users/models/user.model";

export type SupportRequestDocument = HydratedDocument<SupportRequest>;

@Schema({ timestamps: true })
export class SupportRequest {
    id: ID;
    createdAt: string;

    get hasNewMessages(): boolean {
        const newMessages = this.messages.filter(m => !Boolean(m.readAt));
        return Boolean(newMessages.length);
    }

    @Prop({
        isRequired: true,
        type: Types.ObjectId,
        ref: 'User',
        autopopulate: true
    })
    user: User;

    @Prop({
        isRequired: true,
        type: [{
            type: Types.ObjectId, ref: 'Message'
        }]
    })
    messages: Message[];

    @Prop({ default: true })
    isActive: boolean;
}

export const SupportRequestSchema =
    SchemaFactory.createForClass(SupportRequest);