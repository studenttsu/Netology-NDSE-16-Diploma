import { OmitType } from "@nestjs/swagger";
import { UserDto } from "../../users/dto/user.dto";

export class AuthUserDto extends OmitType(UserDto, ['id', 'role', 'role']) {}