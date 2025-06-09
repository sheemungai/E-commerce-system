import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../casl-ability.factory';
import { CHECK_POLICIES_KEY } from '../decorators/check-policy.decorator';
import { PolicyHandler } from '../interfaces/policy-handler.interface';
import { Injectable } from '@nestjs/common';
import { handleRetry } from '@nestjs/typeorm';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    if (policyHandlers.length === 0) {
      return true; // No policies to check, allow access
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return false; // No user found, deny access
    }

    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: any): boolean {
    if (typeof handler === 'function') {
      return handler(ability);
    }

    return handler.handle(ability);
  }
}
