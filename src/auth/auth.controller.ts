import {
    BadRequestException,
    Body,
    Controller,
    Post, Req,
    UseGuards
} from '@nestjs/common';
import {
    ApiCookieAuth,
    ApiOkResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";

import { UsersService } from "../users/users.service";
import { UserRole } from "../core/user-role.enum";
import { AuthUserDto } from "./dto/auth-user.dto";
import { RegisteredUserDto, RegisterUserDto } from "./dto/registered-user.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { ReqUser } from "../core/decorators/req-user.decorator";
import { ReqUserDto } from "./dto/req-user.dto";
import { AuthGuard } from "./guards/auth.guard";
import { AuthDto } from "./dto/auth.dto";

@ApiTags('Auth done')
@Controller()
export class AuthController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/client/register')
    @ApiOperation({ summary: 'Создает нового пользователя с ролью client' })
    @ApiOkResponse({ type: RegisteredUserDto })
    @ApiResponse({
        status: 400,
        description: 'Пользователь с таким email уже существует'
    })
    async registerUser(@Body() userDto: RegisterUserDto): Promise<RegisteredUserDto> {
        const user = await this.usersService.findByEmail(userDto.email);

        if (user) {
            throw new BadRequestException(`Пользователь с email ${userDto.email} уже существует`);
        }

        const createdUser = await this.usersService.create({...userDto, role: UserRole.Client});
        return new RegisteredUserDto(createdUser);
    }

    @Post('/auth/login')
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'Вход' })
    @ApiOkResponse({ type: AuthUserDto })
    @ApiUnauthorizedResponse({ description: 'Пользователь с таким email не найден' })
    @ApiUnauthorizedResponse({ description: 'Пароль неверный' })
    login(@Body() authDto: AuthDto, @ReqUser() user: ReqUserDto) {
        return user;
    }

    @Post('/auth/logout')
    @UseGuards(AuthGuard)
    @ApiCookieAuth()
    @ApiOperation({ summary: 'Выход' })
    @ApiUnauthorizedResponse()
    logout(@Req() req) {
        req.session.destroy();
    }
}
