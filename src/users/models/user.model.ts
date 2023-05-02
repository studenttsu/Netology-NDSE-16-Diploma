import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from '../../core/user-role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    id: string;

    @Prop({ isRequired: true, unique: true })
    email: string;

    @Prop({ isRequired: true })
    passwordHash: string;

    @Prop({ isRequired: true })
    name: string;

    @Prop({ isRequired: true })
    contactPhone: string;

    @Prop({ isRequired: true, enum: UserRole })
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
