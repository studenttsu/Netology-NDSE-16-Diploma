import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IUserService } from './interfaces/user-service.interface';
import { User, UserDocument } from './models/user.model';
import { ID } from '../core/types';
import { SearchUserParams } from './interfaces/search-user-params.interface';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService implements IUserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async create(data: CreateUserDto): Promise<User> {
        const user = new this.userModel({
            ...data,
            passwordHash: await bcrypt.hash(data.password, 10),
        });

        return user.save();
    }

    findById(id: ID): Promise<User> {
        return this.userModel.findById(id);
    }

    findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email });
    }

    findAll(params: SearchUserParams): Promise<User[]> {
        const filter = {};

        if (params.name) {
            filter['name'] = new RegExp(`^${params.name}`, 'i');
        }

        if (params.email) {
            filter['email'] = new RegExp(`^${params.email}`, 'i');
        }

        if (params.contactPhone) {
            filter['contactPhone'] = new RegExp(`^${params.contactPhone}`, 'i');
        }

        return this.userModel
            .find(filter)
            .select(['-__v', '-passwordHash'])
            .skip(params.offset ?? 0)
            .limit(params.limit ?? 100);
    }

    async verifyPassword(password: string, hash: string) {
        const matched = await bcrypt.compare(password, hash);

        if (!matched) {
            throw new UnauthorizedException('Пароль неверный');
        }
    }
}
