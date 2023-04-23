import { ApiProperty } from "@nestjs/swagger";

export class HotelRoomDto {}

export class CreateHotelRoomDto {
    @ApiProperty()
    description: string;

    @ApiProperty()
    hotelId: number;
}