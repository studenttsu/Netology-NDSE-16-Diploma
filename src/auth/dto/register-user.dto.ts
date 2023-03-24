import { OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "../../users/dto/user.dto";

export class RegisterUserDto extends OmitType(CreateUserDto, ['role']) {}