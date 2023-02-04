import {ParamMap} from '../../generic'

export abstract class UrlSegment {
  abstract path: string
  abstract parameters: {
    [name: string]: string
  }
  abstract get parameterMap(): ParamMap
  abstract toString(): string
}
