import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { Hotel, HotelSchema } from "./models/hotel.model";
import { HotelRoom, HotelRoomSchema } from "./models/hotel-room.model";
import { HotelRoomsService } from "./hotel-rooms.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema }
    ]),
  ],
  controllers: [HotelsController],
  providers: [HotelsService, HotelRoomsService]
})
export class HotelsModule {}
