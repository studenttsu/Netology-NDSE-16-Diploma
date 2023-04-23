import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HotelRoomDocument = HydratedDocument<HotelRoom>;

@Schema({ timestamps: true })
export class HotelRoom {
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

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);