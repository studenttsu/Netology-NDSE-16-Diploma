import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
    @ApiProperty({ description: 'Email' })
    email: string;

    @ApiProperty({ description: 'Пароль' })
    password: string;
}
