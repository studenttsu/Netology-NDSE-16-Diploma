import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const isAuthenticated = request.isAuthenticated();

        if (!isAuthenticated) {
            throw new UnauthorizedException();
        }

        return isAuthenticated;
    }
}