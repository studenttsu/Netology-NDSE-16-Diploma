import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { HotelDto } from "./HotelDto";
import { HotelRoom } from "../models/hotel-room.model";

export class HotelRoomDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ type: [String] })
    images: string[];

    @ApiProperty()
    isEnabled: boolean;

    @ApiProperty({ type: HotelDto })
    hotel: HotelDto;

    constructor(hotelRoom: HotelRoom) {
        this.id = hotelRoom.id;
        this.description = hotelRoom.description;
        this.isEnabled = hotelRoom.isEnabled;
        this.images = hotelRoom.images;
        this.hotel = new HotelDto(hotelRoom.hotel);
    }
}

export class CreateHotelRoomDto {
    @ApiProperty()
    description: string;

    @ApiProperty()
    hotelId: number;

    @IsOptional()
    @ApiProperty({
        required: false,
        type: ['string'],
        format: 'binary',
        name: 'images'
    })
    images: Express.Multer.File[];
}