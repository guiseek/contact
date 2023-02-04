import {Data, ParamMap, Params, Type} from '../../generic'
import {UrlSegment} from './url-segment'

export abstract class ActivatedRouteSnapshot {
  abstract url: UrlSegment[]
  abstract params: Params
  abstract queryParams: Params
  abstract fragment: string | null
  abstract data: Data
  abstract outlet: string
  abstract component: Type<any> | null
  // abstract readonly routeConfig: Route | null;
  abstract get title(): string | undefined
  abstract get root(): ActivatedRouteSnapshot
  abstract get parent(): ActivatedRouteSnapshot | null
  abstract get firstChild(): ActivatedRouteSnapshot | null
  abstract get children(): ActivatedRouteSnapshot[]
  abstract get pathFromRoot(): ActivatedRouteSnapshot[]
  abstract get paramMap(): ParamMap
  abstract get queryParamMap(): ParamMap
  abstract toString(): string
}
