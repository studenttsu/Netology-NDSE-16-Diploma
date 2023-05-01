import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { ID } from "../../core/types";
import { HotelDto } from "../../hotels/dto/HotelDto";
import { HotelRoomShortDto } from "../../hotels/dto/HotelRoomDto";
import { Reservation } from "../models/reservation.model";
import { HotelRoom } from "../../hotels/models/hotel-room.model";
import { Hotel } from "../../hotels/models/hotel.model";

export class CreateReservationDto {
    @ApiProperty()
    @IsString()
    hotelRoom: string;

    @ApiProperty()
    @IsString()
    startDate: string;

    @ApiProperty()
    @IsString()
    endDate: string;
}

export class ReservationDto {
    @ApiProperty()
    id: ID;

    @ApiProperty()
    startDate: string;

    @ApiProperty()
    endDate: string;

    @ApiProperty({ type: HotelRoomShortDto })
    hotelRoom: HotelRoomShortDto;

    @ApiProperty({ type: HotelDto })
    hotel: HotelDto;

    constructor(data: {
        reservation: Reservation;
        hotelRoom: HotelRoom;
        hotel: Hotel;
    }) {
        this.startDate = data.reservation.dateStart;
        this.endDate = data.reservation.dateEnd;
        this.hotelRoom = new HotelRoomShortDto(data.hotelRoom);
        this.hotel = new HotelDto(data.hotel);
    }
}