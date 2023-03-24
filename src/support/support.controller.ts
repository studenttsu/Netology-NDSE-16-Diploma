import { Controller } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Чат поддержки')
@Controller('support')
export class SupportController {}
