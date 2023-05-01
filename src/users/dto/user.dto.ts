import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserRole } from '../../core/user-role.enum';
import { User } from '../models/user.model';

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

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.contactPhone = user.contactPhone;
    this.role = user.role;
  }
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {
  @IsString()
  @ApiProperty({ description: 'Пароль' })
  password: string;
}
