import {ActivatedRouteSnapshot} from './activated-route-snapshot'
import {Tree} from './tree'

export abstract class RouterStateSnapshot extends Tree<ActivatedRouteSnapshot> {
  abstract url: string
  abstract override toString(): string
}
