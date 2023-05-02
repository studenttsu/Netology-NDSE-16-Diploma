import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
    ApiCookieAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateUserDto, UserDto } from './dto/user.dto';
import { SearchUserParams } from './interfaces/search-user-params.interface';
import { UsersService } from './users.service';
import { Roles } from '../core/decorators/roles.decorator';
import { UserRole } from '../core/user-role.enum';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Пользователи')
@UseGuards(AuthGuard)
@ApiCookieAuth()
@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/admin/users')
    @Roles(UserRole.Admin)
    @ApiOperation({ summary: 'Создает пользователя' })
    @ApiCreatedResponse({ type: UserDto })
    @ApiUnauthorizedResponse({
        description: 'Пользователь не аутентифицирован',
    })
    @ApiForbiddenResponse({ description: 'Роль пользователя не admin' })
    async createUser(@Body() userDto: CreateUserDto) {
        const user = await this.usersService.create(userDto);

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone,
            role: user.role,
        };
    }

    @Get('/admin/users')
    @Roles(UserRole.Admin)
    @ApiOperation({ summary: 'Возвращает пользователей для администратора' })
    @ApiOkResponse({ type: [UserDto] })
    @ApiUnauthorizedResponse({
        description: 'Пользователь не аутентифицирован',
    })
    @ApiForbiddenResponse({ description: 'Роль пользователя не admin' })
    async getAdminUsers(@Query() query: SearchUserParams) {
        const users = await this.usersService.findAll(query);

        return users.map((user) => ({
            id: user.id,
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone,
        }));
    }

    @Get('/manager/users')
    @Roles(UserRole.Manager)
    @ApiOperation({ summary: 'Возвращает пользователей для менеджера' })
    @ApiOkResponse({ type: [UserDto] })
    @ApiUnauthorizedResponse({
        description: 'Пользователь не аутентифицирован',
    })
    @ApiForbiddenResponse({ description: 'Роль пользователя не manager' })
    async getManagerUsers(@Query() query: SearchUserParams) {
        const users = await this.usersService.findAll(query);

        return users.map((user) => ({
            id: user.id,
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone,
        }));
    }
}
