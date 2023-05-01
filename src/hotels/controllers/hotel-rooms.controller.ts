import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { UserRole } from '../../core/user-role.enum';
import { Roles } from '../../core/decorators/roles.decorator';
import { SearchRoomsParams } from '../interfaces/search-rooms-params.interface';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CreateHotelRoomDto, HotelRoomDto } from '../dto/HotelRoomDto';
import { HotelRoomsService } from '../services/hotel-rooms.service';

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
  @ApiCreatedResponse({ type: HotelRoomDto })
  @UseInterceptors(FilesInterceptor('images'))
  async createHotelRoom(
    @Body() hotelRoomDto: CreateHotelRoomDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.hotelRoomsService.create({
      ...hotelRoomDto,
      images,
    });
  }

  @Put('/admin/hotel-rooms/:id')
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Изменение описания номера гостиницы администратором',
  })
  updateHotelRoom(@Param('id') id: string) {
    // TODO: Реализовать логику
  }

  @Get('/common/hotel-rooms')
  @ApiOperation({ summary: 'Основной API для поиска номеров' })
  async getHotelRooms(@Query() params: SearchRoomsParams) {
    const rooms = await this.hotelRoomsService.search(params);
    return rooms.map((r) => new HotelRoomDto(r));
  }

  @Get('/common/hotel-rooms/:id')
  @ApiOperation({ summary: 'Получение подробной информации о номере' })
  async getHotelRoomsById(@Param('id') id: string) {
    const room = await this.hotelRoomsService.findById(id);
    return new HotelRoomDto(room);
  }
}
