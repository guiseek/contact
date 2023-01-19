import {inject} from '@angular/core'
import {AuthFacade} from '@contact/auth/data-access'
import {UserFacade} from '@contact/user/data-access'

export abstract class UserFeatureShell {
  protected auth = inject(AuthFacade)
  protected user = inject(UserFacade)
}
