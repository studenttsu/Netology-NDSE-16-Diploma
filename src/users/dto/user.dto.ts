import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { UserRole } from "../../common/user-role.enum";

export class UserDto {
    @ApiProperty({ description: 'Id' })
    id: string;

    @IsString()
    @ApiProperty({ description: 'Email' })
    email: string;

    @IsString()
    @ApiProperty({ description: 'Имя' })
    name: string;

    @IsString()
    @ApiProperty({ description: 'Номер телефона' })
    contactPhone: string;

    @IsString()
    @ApiProperty({ description: 'Роль', enum: UserRole })
    role: UserRole;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {
    @IsString()
    @ApiProperty({ description: 'Пароль' })
    password: string;
}