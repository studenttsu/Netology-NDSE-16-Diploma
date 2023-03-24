import { User } from "../models/user.model";
import { SearchUserParams } from "./search-user-params.interface";
import { ID } from "../../common/types";

export interface IUserService {
    create(data: Partial<User>): Promise<User>;
    findById(id: ID): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findAll(params: SearchUserParams): Promise<User[]>;
}