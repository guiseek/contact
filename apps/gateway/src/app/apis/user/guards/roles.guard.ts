import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common'
import {UserRole} from '@contact/shared/types'
import {Reflector} from '@nestjs/core'
import {ROLES_KEY} from '../../../utils'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    )
    if (!requiredRoles) {
      return true
    }
    const {user} = context.switchToHttp().getRequest()
    return requiredRoles.some((role) => user?.roles?.includes(role))
  }
}
