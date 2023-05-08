import {
    Body,
    Controller, DefaultValuePipe,
    Get,
    Param, ParseBoolPipe,
    ParseIntPipe,
    Post, Query,
    UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Roles } from '../core/decorators/roles.decorator';
import { UserRole } from '../core/user-role.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RequestMessageDto, SupportRequestDto, SupportRequestWithClientDto } from "./dto/SupportRequestDto";
import { SupportRequestService } from "./services/support-request.service";
import { SupportRequestClientService } from "./services/support-request-client.service";
import { ReqUser } from "../core/decorators/req-user.decorator";
import { ReqUserDto } from "../auth/dto/req-user.dto";
import { ApiPaginatedResponse } from "../core/pagination/ApiPaginatedResponse";
import { PageDto } from "../core/pagination/PageDto";

@ApiTags('Чат с тех. поддержкой')
@UseGuards(AuthGuard)
@ApiCookieAuth()
@Controller()
export class SupportController {
    constructor(
        private readonly supportService: SupportRequestService,
        private readonly supportClientService: SupportRequestClientService
    ) {
    }

    @Post('/client/support-requests')
    @Roles(UserRole.Client)
    @ApiOperation({
        summary:
            'Позволяет пользователю с ролью client создать обращение в техподдержку',
    })
    createRequest(
        @ReqUser() user: ReqUserDto,
        @Body() requestDto: RequestMessageDto,
    ) {
        return this.supportClientService.createSupportRequest({
            user: user.id,
            text: requestDto.text
        })
    }

    @Get('/client/support-requests')
    @Roles(UserRole.Client)
    @ApiOperation({
        summary:
            'Позволяет пользователю с ролью client получить список обращений для текущего пользователя',
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
    @ApiQuery({
        name: 'isActive',
        type: Boolean,
        required: false,
    })
    @ApiPaginatedResponse(SupportRequestDto)
    async getRequests(
        @ReqUser() user: ReqUserDto,
        @Query('isActive', new DefaultValuePipe(true), ParseBoolPipe) isActive: boolean,
        @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
        @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
    ): Promise<PageDto<SupportRequestDto>> {
        const response = await this.supportService.findSupportRequests({
            user: user.id,
            isActive,
            limit,
            offset
        });

        return new PageDto({
            total: response.total,
            limit,
            offset,
            results: response.requests.map(r => new SupportRequestDto(r))
        });
    }

    @Get('/manager/support-requests')
    @Roles(UserRole.Manager)
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
    @ApiQuery({
        name: 'isActive',
        type: Boolean,
        required: false,
    })
    @ApiOperation({
        summary:
            'Позволяет пользователю с ролью manager получить список обращений от клиентов',
    })
    @ApiPaginatedResponse(SupportRequestWithClientDto)
    async getManagerRequests(
        @Query('isActive', new DefaultValuePipe(true), ParseBoolPipe) isActive: boolean,
        @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
        @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
    ): Promise<PageDto<SupportRequestWithClientDto>> {
        const response = await this.supportService.findSupportRequests({
            isActive,
            limit,
            offset
        });

        return new PageDto({
            total: response.total,
            limit,
            offset,
            results: response.requests.map(r => new SupportRequestWithClientDto(r))
        });
    }

    @Get('/common/support-requests/:id/messages')
    @Roles(UserRole.Client, UserRole.Manager)
    @ApiOperation({
        summary:
            'Позволяет пользователю с ролью manager или client получить все сообщения из чата',
    })
    getMessages(@Param('id', ParseIntPipe) id: number) {

    }

    @Post('/common/support-requests/:id/messages')
    @Roles(UserRole.Client, UserRole.Manager)
    @ApiOperation({
        summary:
            'Позволяет пользователю с ролью manager или client отправлять сообщения в чат',
    })
    sendMessage() {}

    @Post('/common/support-requests/:id/messages/read')
    @Roles(UserRole.Client, UserRole.Manager)
    @ApiOperation({
        summary:
            'Позволяет пользователю с ролью manager или client отправлять отметку, что сообщения прочитаны',
    })
    readMessage() {}
}
