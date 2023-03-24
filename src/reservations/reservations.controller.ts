import { Controller } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Брони')
@Controller('reservations')
export class ReservationsController {}
