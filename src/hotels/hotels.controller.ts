import {
    BadRequestException,
    Body,
    Controller, DefaultValuePipe,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query, UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ApiConsumes, ApiCookieAuth, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";

import { UserRole } from "../core/user-role.enum";
import { Roles } from "../core/decorators/roles.decorator";
import { HotelsService } from "./hotels.service";
import { SearchRoomsParams } from "./interfaces/search-rooms-params.interface";
import { AuthGuard } from "../auth/guards/auth.guard";
import { CreateHotelRoomDto } from "./dto/HotelRoomDto";
import { UpdateCreateHotelDto, HotelDto } from "./dto/HotelDto";
import { HotelRoomsService } from "./hotel-rooms.service";
import { ApiPaginatedResponse } from "../core/pagination/ApiPaginatedResponse";
import { PageDto } from "../core/pagination/PageDto";

@ApiTags('Гостиницы')
@Controller()
export class HotelsController {
    constructor(
        private readonly hotelsService: HotelsService,
        private readonly hotelRoomsService: HotelRoomsService,
    ) {
    }

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

    @Post('/admin/hotels')
    @UseGuards(AuthGuard)
    @ApiCookieAuth()
    @Roles(UserRole.Admin)
    @ApiOkResponse({ type: HotelDto })
    @ApiOperation({ summary: 'Добавление гостиницы администратором' })
    async createHotel(@Body() hotelDto: UpdateCreateHotelDto): Promise<HotelDto> {
        if (!hotelDto.title) {
            throw new BadRequestException('Название не задано');
        }

        const hotel = await this.hotelsService.create(hotelDto);
        return new HotelDto(hotel);
    }

    @Get('/admin/hotels')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard)
    @ApiCookieAuth()
    @ApiQuery({
        name: 'title',
        type: String,
        required: false,
        description: 'Фильтр по названию'
    })
    @ApiQuery({
        name: 'offset',
        type: Number,
        required: false,
        description: 'Сдвиг от начала списка',
        example: 0
    })
    @ApiQuery({
        name: 'limit',
        type: Number,
        required: false,
        description: 'Количество записей в ответе',
        example: 100
    })
    @ApiPaginatedResponse(HotelDto)
    @ApiOperation({ summary: 'Получение списка гостиниц администратором' })
    getHotels(
        @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset : number,
        @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit : number,
        @Query('title') title: string,
    ): Promise<PageDto<HotelDto>> {
        return this.hotelsService.search({ offset, limit, title });
    }

    @Put('/admin/hotels/:id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard)
    @ApiCookieAuth()
    @ApiOkResponse({ type: HotelDto })
    @ApiOperation({ summary: 'Изменение описания гостиницы администратором' })
    async updateHotel(
        @Param('id') id: string,
        @Body() hotelDto: UpdateCreateHotelDto
    ): Promise<HotelDto> {
        const hotel = await this.hotelsService.update(id, hotelDto);
        return new HotelDto(hotel);
    }
}
