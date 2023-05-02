import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Hotel } from './hotel.model';

export type HotelRoomDocument = HydratedDocument<HotelRoom>;

@Schema({ timestamps: true })
export class HotelRoom {
    id: string;

    @Prop({
        isRequired: true,
        type: Types.ObjectId,
        ref: 'Hotel',
        autopopulate: true,
    })
    hotel: Hotel;

    @Prop()
    description: string;

    @Prop()
    images: string[];

    @Prop({ isRequired: true, default: true })
    isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
