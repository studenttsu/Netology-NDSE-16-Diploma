import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { HotelsController } from './controllers/hotels.controller';
import { HotelsService } from './services/hotels.service';
import { Hotel, HotelSchema } from "./models/hotel.model";
import { HotelRoom, HotelRoomSchema } from "./models/hotel-room.model";
import { HotelRoomsService } from "./services/hotel-rooms.service";
import { HotelRoomsController } from "./controllers/hotel-rooms.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema }
    ]),
  ],
  controllers: [HotelsController, HotelRoomsController],
  providers: [HotelsService, HotelRoomsService]
})
export class HotelsModule {}
