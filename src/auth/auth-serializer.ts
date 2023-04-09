import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { ReqUserDto } from "./dto/req-user.dto";
import { User } from "../users/models/user.model";

@Injectable()
export class AuthSerializer extends PassportSerializer {
    constructor() {
        super();
    }

    serializeUser(user: User, done: (err: Error, user: ReqUserDto) => void) {
        done(null, {
            id: user.id,
            name: user.name,
            role: user.role
        });
    }

    deserializeUser(payload: ReqUserDto, done: (err: Error, user: ReqUserDto) => void) {
        done(null, payload);
    }
}