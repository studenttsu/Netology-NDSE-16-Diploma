import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

import { UsersService } from "../users/users.service";
import { UserRole } from "../core/user-role.enum";
import { AuthDto } from "./dto/authDto";
import { AuthUserDto } from "./dto/auth-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('/client/register')
    @ApiOperation({ summary: 'Создает нового пользователя с ролью client' })
    registerUser(@Body() userDto: RegisterUserDto) {
        return this.usersService.create({...userDto, role: UserRole.Client})
    }

    @Post('/auth/login')
    @ApiOperation({ summary: 'Вход' })
    @ApiOkResponse({ type: AuthUserDto })
    login(@Body() authDto: AuthDto) {}

    @Post('/auth/logout')
    @ApiOperation({ summary: 'Выход' })
    @ApiUnauthorizedResponse()
    logout() {}
}
