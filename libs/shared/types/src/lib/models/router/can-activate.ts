import {Observable} from 'rxjs'
import {ActivatedRouteSnapshot} from './activated-route-snapshot'
import {RouterStateSnapshot} from './router-state-snapshot'
import {UrlTree} from './url-tree'

export interface CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree
}
