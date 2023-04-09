import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CreateUserDto } from "../../users/dto/user.dto";
import { User } from "../../users/models/user.model";

export class RegisterUserDto extends OmitType(CreateUserDto, ['role']) {}

export class RegisteredUserDto {
    @ApiProperty({ description: 'Id' })
    id: string;

    @IsString()
    @ApiProperty({ description: 'Email' })
    email: string;

    @IsString()
    @ApiProperty({ description: 'Имя' })
    name: string;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
    }

}