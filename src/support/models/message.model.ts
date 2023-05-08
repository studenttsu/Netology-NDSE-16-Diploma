import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
    @Prop({ isRequired: true })
    author: Types.ObjectId;

    @Prop({ isRequired: true, type: Date, default: Date.now })
    sentAt: Date;

    @Prop({ isRequired: true })
    text: string;

    @Prop()
    readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
