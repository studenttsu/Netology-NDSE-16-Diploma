import { Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "../core/decorators/roles.decorator";
import { UserRole } from "../core/user-role.enum";
import { AuthGuard } from "../auth/guards/auth.guard";

@ApiTags('Бронирование')
@UseGuards(AuthGuard)
@ApiCookieAuth()
@Controller()
export class ReservationsController {
    @Post('/client/reservations')
    @Roles(UserRole.Client)
    @ApiOperation({ summary: 'Создаёт бронь на номер на выбранную дату для текущего пользователя' })
    createReservation() {}

    @Get('/client/reservations')
    @Roles(UserRole.Client)
    @ApiOperation({ summary: 'Список броней текущего пользователя' })
    getReservations() {}

    @Get('/manager/reservations/:userId')
    @Roles(UserRole.Manager)
    @ApiOperation({ summary: 'Список броней конкретного пользователя' })
    getUserReservations(@Param('userId', ParseIntPipe) userId: number) {}

    @Delete('/client/reservations/:id')
    @Roles(UserRole.Client)
    @ApiOperation({ summary: 'Отменяет бронь пользователя' })
    removeReservation(@Param('id', ParseIntPipe) id: number) {}

    @Delete('/manager/reservations/:id')
    @Roles(UserRole.Manager)
    @ApiOperation({ summary: 'Отменяет бронь пользователя' })
    removeReservationMyManager(@Param('id', ParseIntPipe) id: number) {}
}
