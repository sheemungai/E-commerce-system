import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ROLES_KEY } from '../decorators';
import { Role } from 'src/users/enums/user-role.enum';
import { JWTPayLoad } from '../strategies/at.strategy';

interface UserRequest extends User {
  user?: JWTPayLoad; // Extend Request to include user property
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const user = context.switchToHttp().getRequest<UserRequest>();

    if (!user) {
      return false; //no user
    }
    return requiredRoles.some((role) => user.role === role);
  }
}
