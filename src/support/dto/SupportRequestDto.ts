import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ID } from "../../core/types";
import { SupportRequest } from "../models/support-request.model";
import { UserDto } from "../../users/dto/user.dto";

export class RequestMessageDto {
    @ApiProperty()
    @IsString()
    text: string;
}

export class SupportRequestDto {
    @ApiProperty()
    id: ID;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    hasNewMessages: boolean;

    constructor(request: SupportRequest) {
        this.id = request.id;
        this.createdAt = request.createdAt;
        this.isActive = request.isActive;
        this.hasNewMessages = request.hasNewMessages;
    }
}

export class SupportRequestClientDto extends OmitType(UserDto, ['role']) {}

export class SupportRequestWithClientDto extends SupportRequestDto {
    @ApiProperty({
        type: SupportRequestClientDto
    })
    client: SupportRequestClientDto;

    constructor(request: SupportRequest) {
        super(request);
        this.client = new SupportRequestClientDto(request.user);
    }
}