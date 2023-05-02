import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Message } from './message.model';

export type SupportRequestDocument = HydratedDocument<SupportRequest>;

@Schema({ timestamps: true })
export class SupportRequest {
    @Prop({ isRequired: true, ref: 'User' })
    user: Types.ObjectId;

    @Prop({ isRequired: true })
    messages: Message[];

    @Prop()
    isActive: boolean;
}

export const SupportRequestSchema =
    SchemaFactory.createForClass(SupportRequest);
