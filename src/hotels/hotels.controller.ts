import { Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Гостиницы')
@Controller()
export class HotelsController {
    @Post('/admin/hotel-rooms')
    createHotelRoom() {}

    @Put('/admin/hotel-rooms/:id')
    updateHotelRoom(@Param('id', ParseIntPipe) id: number) {}

    @Get('/common/hotel-rooms')
    getHotelRooms() {}

    @Get('/common/hotel-rooms/:id')
    getHotelRoomsById(@Param('id', ParseIntPipe) id: number) {}

    @Post('/admin/hotels')
    createHotel() {}

    @Get('/admin/hotels')
    getHotels() {}

    @Put('/admin/hotels/:id')
    updateHotel(@Param('id', ParseIntPipe) id: number) {}
}
