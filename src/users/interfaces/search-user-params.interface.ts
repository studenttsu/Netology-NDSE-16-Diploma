import { ApiProperty } from "@nestjs/swagger";

export class SearchUserParams {
    @ApiProperty({
        description: 'Количество записей в ответе',
        required: false,
        default: 100
    })
    limit: number;

    @ApiProperty({
        description: 'Сдвиг от начала списка',
        required: false,
        default: 0
    })
    offset: number;

    @ApiProperty({
        description: 'Email',
        required: false
    })
    email: string;

    @ApiProperty({
        description: 'Имя',
        required: false
    })
    name: string;

    @ApiProperty({
        description: 'Номер телефона',
        required: false
    })
    contactPhone: string;
}