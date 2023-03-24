import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation {
    @Prop({ isRequired: true })
    userId: Types.ObjectId;

    @Prop({ isRequired: true })
    hotelId: Types.ObjectId;

    @Prop({ isRequired: true })
    roomId: Types.ObjectId;

    @Prop({ isRequired: true })
    dateStart: Date;

    @Prop({ isRequired: true })
    dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);