import {NavigationExtras} from './navigation-extras'

export abstract class Router {
  abstract navigate(
    commands: any[],
    extras?: NavigationExtras
  ): Promise<boolean>
}
