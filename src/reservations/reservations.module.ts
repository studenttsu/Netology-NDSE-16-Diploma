import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { HotelsModule } from '../hotels/hotels.module';
import { Reservation, ReservationSchema } from './models/reservation.model';

@Module({
  imports: [
    HotelsModule,
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
