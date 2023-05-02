import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../core/user-role.enum';

export class ReqUserDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    role: UserRole;
}
