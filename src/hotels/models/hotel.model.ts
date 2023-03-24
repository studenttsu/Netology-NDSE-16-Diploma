import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HotelDocument = HydratedDocument<Hotel>;

@Schema({ timestamps: true })
export class Hotel {
    @Prop({
        isRequired: true,
        type: Types.ObjectId,
        ref: 'Hotel'
    })
    hotel: Types.ObjectId;

    @Prop()
    description: string;

    @Prop()
    images: string[];

    @Prop({ isRequired: true, default: true })
    isEnabled: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);