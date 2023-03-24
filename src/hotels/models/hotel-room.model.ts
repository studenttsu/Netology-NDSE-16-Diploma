import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HotelRoomDocument = HydratedDocument<HotelRoom>;

@Schema({ timestamps: true })
export class HotelRoom {
    @Prop({ isRequired: true, unique: true })
    email: string;

    @Prop({ isRequired: true, type: Types.ObjectId })
    title: Types.ObjectId;

    @Prop()
    description: string;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);