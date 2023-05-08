import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { SupportController } from './support.controller';
import { SupportRequestService } from './services/support-request.service';
import { Message, MessageSchema } from "./models/message.model";
import { SupportRequest, SupportRequestSchema } from "./models/support-request.model";
import { SupportRequestClientService } from "./services/support-request-client.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Message.name, schema: MessageSchema },
            { name: SupportRequest.name, schema: SupportRequestSchema },
        ]),
    ],
    controllers: [SupportController],
    providers: [SupportRequestService, SupportRequestClientService],
})
export class SupportModule {}
