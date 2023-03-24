import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { IUserService } from "./interfaces/user-service.interface";
import { User, UserDocument } from "./models/user.model";
import { ID } from "../core/types";
import { SearchUserParams } from "./interfaces/search-user-params.interface";
import { CreateUserDto } from "./dto/user.dto";

@Injectable()
export class UsersService implements IUserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    create(data: CreateUserDto): Promise<User> {
        const user = new this.userModel(data);
        return user.save();
    }

    findById(id: ID): Promise<User> {
        return this.userModel.findById(id);
    }

    findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email });
    }

    findAll(params: SearchUserParams): Promise<User[]> {
        return this.userModel.find(params)
            .skip(params.offset)
            .limit(params.limit);
    }
}
