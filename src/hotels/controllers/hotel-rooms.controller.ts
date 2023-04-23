import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query, UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ApiConsumes, ApiCookieAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";

import { UserRole } from "../../core/user-role.enum";
import { Roles } from "../../core/decorators/roles.decorator";
import { SearchRoomsParams } from "../interfaces/search-rooms-params.interface";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { CreateHotelRoomDto } from "../dto/HotelRoomDto";
import { HotelRoomsService } from "../services/hotel-rooms.service";

@ApiTags('Гостиницы')
@Controller()
export class HotelRoomsController {
    constructor(private readonly hotelRoomsService: HotelRoomsService) {}

    @Post('/admin/hotel-rooms')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard)
    @ApiCookieAuth()
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Добавление номера гостиницы администратором' })
    @UseInterceptors(FilesInterceptor('images'))
    createHotelRoom(
        @Body() hotelRoomDto: CreateHotelRoomDto,
        @UploadedFiles() images: Express.Multer.File[]
    ) {
        console.log(hotelRoomDto, images);
    }

    @Put('/admin/hotel-rooms/:id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard)
    @ApiCookieAuth()
    @ApiOperation({ summary: 'Изменение описания номера гостиницы администратором' })
    updateHotelRoom(@Param('id', ParseIntPipe) id: number) {}

    @Get('/common/hotel-rooms')
    @ApiOperation({ summary: 'Основной API для поиска номеров' })
    getHotelRooms(@Query() params: SearchRoomsParams) {
        return this.hotelRoomsService.search(params);
    }

    @Get('/common/hotel-rooms/:id')
    @ApiOperation({ summary: 'Получение подробной информации о номере' })
    getHotelRoomsById(@Param('id', ParseIntPipe) id: number) {}

}
