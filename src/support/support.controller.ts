import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../core/decorators/roles.decorator';
import { UserRole } from '../core/user-role.enum';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Чат с техподдрежкой')
@UseGuards(AuthGuard)
@ApiCookieAuth()
@Controller()
export class SupportController {
    @Post('/client/support-requests')
    @Roles(UserRole.Client)
    @ApiOperation({
        summary:
            'Позволяет пользователю с ролью client создать обращение в техподдержку',
    })
    createRequest() {}

    @Get('/client/support-requests')
    @Roles(UserRole.Client)
    @ApiOperation({
        summary:
            'Позволяет пользователю с ролью client получить список обращений для текущего пользователя',
    })
    getRequests() {}

    @Get('/manager/support-requests')
    @Roles(UserRole.Client)
    @ApiOperation({
        summary:
            'Позволяет пользователю с ролью manager получить список обращений от клиентов',
    })
    getManagerRequests() {}

    @Get('/common/support-requests/:id/messages')
    @Roles(UserRole.Client, UserRole.Manager)
    @ApiOperation({
        summary:
            'Позволяет пользователю с ролью manager или client получить все сообщения из чата',
    })
    getMessages(@Param('id', ParseIntPipe) id: number) {}

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
