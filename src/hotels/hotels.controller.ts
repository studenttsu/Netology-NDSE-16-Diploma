import { Controller } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Отели')
@Controller('hotels')
export class HotelsController {}
