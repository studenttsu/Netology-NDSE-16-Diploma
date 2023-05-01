import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Hotel } from '../../hotels/models/hotel.model';
import { HotelRoom } from '../../hotels/models/hotel-room.model';
import { ID } from '../../core/types';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation {
  @Prop({ isRequired: true, type: Types.ObjectId })
  userId: ID;

  @Prop({
    isRequired: true,
    ref: 'Hotel',
    autopopulate: true,
    type: Types.ObjectId,
  })
  hotelId: Hotel;

  @Prop({
    isRequired: true,
    ref: 'HotelRoom',
    autopopulate: true,
    type: Types.ObjectId,
  })
  roomId: HotelRoom;

  @Prop({ isRequired: true, type: Date })
  dateStart: string;

  @Prop({ isRequired: true, type: Date })
  dateEnd: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
