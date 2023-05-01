import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCookieAuth,
    ApiForbiddenResponse, ApiOkResponse,
    ApiOperation, ApiQuery,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";

import { Roles } from "../core/decorators/roles.decorator";
import { UserRole } from "../core/user-role.enum";
import { AuthGuard } from "../auth/guards/auth.guard";
import { CreateReservationDto, ReservationDto } from "./dto/ReservationDto";
import { ReservationsService } from "./reservations.service";
import { HotelRoomsService } from "../hotels/services/hotel-rooms.service";
import { ReqUser } from "../core/decorators/req-user.decorator";
import { ReqUserDto } from "../auth/dto/req-user.dto";
import { ID } from "../core/types";

@ApiTags('Бронирование')
@UseGuards(AuthGuard)
@ApiCookieAuth()
@Controller()
export class ReservationsController {
    constructor(
        private readonly reservationsService: ReservationsService,
        private readonly hotelRoomsService: HotelRoomsService
    ) {}

    @Post('/client/reservations')
    @Roles(UserRole.Client)
    @ApiOkResponse({ type: ReservationDto })
    @ApiOperation({ summary: 'Создаёт бронь на номер на выбранную дату для текущего пользователя' })
    @ApiUnauthorizedResponse({ description: 'Пользователь не аутентифицирован' })
    @ApiForbiddenResponse({ description: 'Роль пользователя не client' })
    @ApiBadRequestResponse({ description: 'Номер с указанным ID не существует или он отключён' })
    @ApiBadRequestResponse({ description: 'Дата окончания не может быть меньше даты начала бронирования' })
    @ApiBadRequestResponse({ description: 'Даты для бронирования заняты' })
    async createReservation(
        @Body() reservationDto: CreateReservationDto,
        @ReqUser() user: ReqUserDto
    ): Promise<ReservationDto> {
        const hotelRoom = await this.hotelRoomsService.findById(reservationDto.hotelRoom);

        if (!hotelRoom) {
            throw new BadRequestException('Номер с указанным id не существует');
        }

        if (!hotelRoom.isEnabled) {
            throw new BadRequestException('Номер с указанным id отключен');
        }

        const dateStart = new Date(reservationDto.startDate);
        const dateEnd = new Date(reservationDto.endDate);

        if (dateEnd < dateStart) {
            throw new BadRequestException('Дата окончания не может быть меньше даты начала бронирования');
        }

        const reservation = await this.reservationsService.addReservation({
            userId: user.id,
            hotelId: hotelRoom.hotel.id,
            roomId: hotelRoom.id,
            dateStart,
            dateEnd,
        });

        return new ReservationDto({
            reservation,
            hotel: hotelRoom.hotel,
            hotelRoom
        });
    }

    @Get('/client/reservations')
    @Roles(UserRole.Client)
    @ApiOkResponse({ type: [ReservationDto] })
    @ApiQuery({ name: 'dateStart', required: false })
    @ApiQuery({ name: 'dateEnd', required: false })
    @ApiOperation({ summary: 'Список броней текущего пользователя' })
    @ApiUnauthorizedResponse({ description: 'Пользователь не аутентифицирован' })
    @ApiForbiddenResponse({ description: 'Роль пользователя не client' })
    async getReservations(
        @ReqUser() user: ReqUserDto,
        @Query('dateStart') dateStart: string,
        @Query('dateEnd') dateEnd: string,
    ): Promise<ReservationDto[]> {
        const reservations = await this.reservationsService.getReservations({
            userId: user.id,
            dateStart: dateStart ? new Date(dateStart) : null,
            dateEnd: dateEnd ? new Date(dateEnd) : null
        });

        return reservations.map(r => new ReservationDto({
            reservation: r,
            hotel: r.hotelId,
            hotelRoom: r.roomId
        }));
    }

    @Get('/manager/reservations/:userId')
    @Roles(UserRole.Manager)
    @ApiOkResponse({ type: [ReservationDto] })
    @ApiQuery({ name: 'dateStart', required: false })
    @ApiQuery({ name: 'dateEnd', required: false })
    @ApiOperation({ summary: 'Список броней конкретного пользователя' })
    @ApiUnauthorizedResponse({ description: 'Пользователь не аутентифицирован' })
    @ApiForbiddenResponse({ description: 'Роль пользователя не manager' })
    async getUserReservations(
        @Param('userId') userId: ID,
        @Query('dateStart') dateStart: string,
        @Query('dateEnd') dateEnd: string,
    ): Promise<ReservationDto[]> {
        const reservations = await this.reservationsService.getReservations({
            userId: userId,
            dateStart: dateStart ? new Date(dateStart) : null,
            dateEnd: dateEnd ? new Date(dateEnd) : null
        });

        return reservations.map(r => new ReservationDto({
            reservation: r,
            hotel: r.hotelId,
            hotelRoom: r.roomId
        }));
    }

    @Delete('/client/reservations/:id')
    @Roles(UserRole.Client)
    @ApiOperation({ summary: 'Отменяет бронь пользователя' })
    @ApiUnauthorizedResponse({ description: 'Пользователь не аутентифицирован' })
    @ApiForbiddenResponse({ description: 'Роль пользователя не client' })
    @ApiForbiddenResponse({ description: 'ID текущего пользователя не совпадает с ID пользователя в брони' })
    @ApiBadRequestResponse({ description: 'Брони с указанным ID не существует' })
    async removeReservation(
        @Param('id') id: ID,
        @ReqUser() user: ReqUserDto,
    ): Promise<void> {
        return this.reservationsService.removeReservation(id, user.id);
    }

    @Delete('/manager/reservations/:id')
    @Roles(UserRole.Manager)
    @ApiOperation({ summary: 'Отменяет бронь пользователя' })
    @ApiUnauthorizedResponse({ description: 'Пользователь не аутентифицирован' })
    @ApiForbiddenResponse({ description: 'Роль пользователя не manager' })
    @ApiBadRequestResponse({ description: 'Брони с указанным ID не существует' })
    removeReservationMyManager(@Param('id') id: ID): Promise<void> {
        return this.reservationsService.removeReservation(id);
    }
}
