import {ActivatedRoute} from './activated-route'
import {Params} from '../../generic'
import {QueryParamsHandling} from './query-params-handling'
import {NavigationBehaviorOptions} from './navigation-behavior-options'

export interface UrlCreationOptions {
  relativeTo?: ActivatedRoute | null
  queryParams?: Params | null
  fragment?: string
  queryParamsHandling?: QueryParamsHandling | null
  preserveFragment?: boolean
}
export interface NavigationExtras
  extends UrlCreationOptions,
    NavigationBehaviorOptions {}
