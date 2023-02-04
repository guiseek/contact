import {ParamMap, Params} from '../../generic'

export abstract class UrlTree {
  // abstract root: UrlSegmentGroup;
  abstract queryParams: Params
  abstract fragment: string | null
  abstract get queryParamMap(): ParamMap
  abstract toString(): string
}
