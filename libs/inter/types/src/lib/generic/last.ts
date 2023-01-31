import type {ArrayInfer} from './array-infer'
import type {Equals} from './equals'
import type {Length} from './length'

export type Last<T extends unknown[]> = Equals<Length<T>, number> extends 1
  ? ArrayInfer<T>
  : T extends [...any, infer U]
  ? U
  : never
