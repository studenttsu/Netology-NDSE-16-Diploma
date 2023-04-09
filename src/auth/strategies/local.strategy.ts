import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "../../users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    async validate(email: string, password: string): Promise<any> {
        if (!email) {
            throw new BadRequestException('Необходимо задать email');
        }

        if (!password) {
            throw new BadRequestException('Необходимо задать пароль');
        }

        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Пользователь с таким email не найден');
        }

        await this.usersService.verifyPassword(password, user.passwordHash);

        return {
            id: user.id,
            role: user.role
        };
    }
}
