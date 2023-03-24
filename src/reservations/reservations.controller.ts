import { Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Бронирование')
@Controller()
export class ReservationsController {
    @Post('/client/reservations')
    @ApiOperation({ summary: 'Создаёт бронь на номер на выбранную дату для текущего пользователя' })
    createReservation() {}

    @Get('/client/reservations')
    @ApiOperation({ summary: 'Список броней текущего пользователя' })
    getReservations() {}

    @Get('/manager/reservations/:userId')
    @ApiOperation({ summary: 'Список броней конкретного пользователя' })
    getUserReservations(@Param('userId', ParseIntPipe) userId: number) {}

    @Delete('/client/reservations/:id')
    @ApiOperation({ summary: 'Отменяет бронь пользователя' })
    removeReservation(@Param('id', ParseIntPipe) id: number) {}

    @Delete('/manager/reservations/:id')
    @ApiOperation({ summary: 'Отменяет бронь пользователя' })
    removeReservationMyManager(@Param('id', ParseIntPipe) id: number) {}
}
