import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { UserRole } from '../../core/user-role.enum';
import { Roles } from '../../core/decorators/roles.decorator';
import { HotelsService } from '../services/hotels.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { UpdateCreateHotelDto, HotelDto } from '../dto/HotelDto';
import { ApiPaginatedResponse } from '../../core/pagination/ApiPaginatedResponse';
import { PageDto } from '../../core/pagination/PageDto';

@ApiTags('Гостиницы')
@UseGuards(AuthGuard)
@Roles(UserRole.Admin)
@ApiCookieAuth()
@Controller()
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post('/admin/hotels')
  @ApiCreatedResponse({ type: HotelDto })
  @ApiOperation({ summary: 'Добавление гостиницы администратором' })
  async createHotel(@Body() hotelDto: UpdateCreateHotelDto): Promise<HotelDto> {
    if (!hotelDto.title) {
      throw new BadRequestException('Название не задано');
    }

    const hotel = await this.hotelsService.create(hotelDto);
    return new HotelDto(hotel);
  }

  @Get('/admin/hotels')
  @ApiQuery({
    name: 'title',
    type: String,
    required: false,
    description: 'Фильтр по названию',
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    description: 'Сдвиг от начала списка',
    example: 0,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Количество записей в ответе',
    example: 100,
  })
  @ApiPaginatedResponse(HotelDto)
  @ApiOperation({ summary: 'Получение списка гостиниц администратором' })
  getHotels(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
    @Query('title') title: string,
  ): Promise<PageDto<HotelDto>> {
    return this.hotelsService.search({ offset, limit, title });
  }

  @Put('/admin/hotels/:id')
  @ApiOkResponse({ type: HotelDto })
  @ApiOperation({ summary: 'Изменение описания гостиницы администратором' })
  async updateHotel(
    @Param('id') id: string,
    @Body() hotelDto: UpdateCreateHotelDto,
  ): Promise<HotelDto> {
    const hotel = await this.hotelsService.update(id, hotelDto);
    return new HotelDto(hotel);
  }
}
