import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiForbiddenResponse, ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";

import { CreateUserDto, UserDto } from "./dto/user.dto";
import { SearchUserParams } from "./interfaces/search-user-params.interface";
import { UsersService } from "./users.service";

@ApiTags('Пользователи')
@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('/admin/users')
    @ApiOperation({ summary: 'Создает пользователя' })
    @ApiCreatedResponse({ type: UserDto })
    @ApiUnauthorizedResponse({ description: 'Пользователь не аутентифицирован' })
    @ApiForbiddenResponse({ description: 'Роль пользователя не admin' })
    createUser(@Body() userDto: CreateUserDto) {
        return this.usersService.create(userDto);
    }

    @Get('/admin/users')
    @ApiOperation({ summary: 'Возвращает пользователей для администратора' })
    @ApiOkResponse({ type: [UserDto] })
    @ApiUnauthorizedResponse({ description: 'Пользователь не аутентифицирован' })
    @ApiForbiddenResponse({ description: 'Роль пользователя не admin' })
    getAdminUsers(@Query() query: SearchUserParams) {
        return this.usersService.findAll(query);
    }

    @Get('/manager/users')
    @ApiOperation({ summary: 'Возвращает пользователей для менеджера' })
    @ApiOkResponse({ type: [UserDto] })
    @ApiUnauthorizedResponse({ description: 'Пользователь не аутентифицирован' })
    @ApiForbiddenResponse({ description: 'Роль пользователя не manager' })
    getManagerUsers(@Query() query: SearchUserParams) {
        return this.usersService.findAll(query);
    }

}
