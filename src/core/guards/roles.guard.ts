import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../user-role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ReqUserDto } from '../../auth/dto/req-user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) {
            return true;
        }

        const user: ReqUserDto = context.switchToHttp().getRequest().user;

        if (!user) {
            throw new UnauthorizedException();
        }

        const roleExist = requiredRoles.some((role) => user.role === role);

        if (!roleExist) {
            throw new ForbiddenException(
                `Отсутствует необходимая роль: ${requiredRoles}`,
            );
        }

        return roleExist;
    }
}
