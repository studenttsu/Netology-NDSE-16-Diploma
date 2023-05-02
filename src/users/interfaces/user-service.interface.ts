import { User } from '../models/user.model';
import { SearchUserParams } from './search-user-params.interface';
import { ID } from '../../core/types';
import { CreateUserDto } from '../dto/user.dto';

export interface IUserService {
    create(data: CreateUserDto): Promise<User>;
    findById(id: ID): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findAll(params: SearchUserParams): Promise<User[]>;
}
