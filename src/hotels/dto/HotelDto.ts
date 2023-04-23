import { ApiProperty } from "@nestjs/swagger";
import { Hotel } from "../models/hotel.model";

export class UpdateCreateHotelDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;
}

export class HotelDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    constructor(hotel: Hotel) {
        this.id = hotel.id;
        this.title = hotel.title;
        this.description = hotel.description;
    }

}