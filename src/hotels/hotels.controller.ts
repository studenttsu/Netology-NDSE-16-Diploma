import { Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserRole } from "../core/user-role.enum";
import { Roles } from "../core/decorators/roles.decorator";

@ApiTags('Гостиницы')
@Controller()
export class HotelsController {
    @Post('/admin/hotel-rooms')
    @Roles(UserRole.Admin)
    @ApiOperation({ summary: 'Добавление номера гостиницы администратором' })
    createHotelRoom() {}

    @Put('/admin/hotel-rooms/:id')
    @Roles(UserRole.Admin)
    @ApiOperation({ summary: 'Изменение описания номера гостиницы администратором' })
    updateHotelRoom(@Param('id', ParseIntPipe) id: number) {}

    @Get('/common/hotel-rooms')
    @ApiOperation({ summary: 'Основной API для поиска номеров' })
    getHotelRooms() {}

    @Get('/common/hotel-rooms/:id')
    @ApiOperation({ summary: 'Получение подробной информации о номере' })
    getHotelRoomsById(@Param('id', ParseIntPipe) id: number) {}

    @Post('/admin/hotels')
    @Roles(UserRole.Admin)
    @ApiOperation({ summary: 'Добавление гостиницы администратором' })
    createHotel() {}

    @Get('/admin/hotels')
    @Roles(UserRole.Admin)
    @ApiOperation({ summary: 'Получение списка гостиниц администратором' })
    getHotels() {}

    @Put('/admin/hotels/:id')
    @Roles(UserRole.Admin)
    @ApiOperation({ summary: 'Изменение описания гостиницы администратором' })
    updateHotel(@Param('id', ParseIntPipe) id: number) {}
}
