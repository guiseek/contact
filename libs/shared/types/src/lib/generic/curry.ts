import type {Length} from './length'
import type {Cast} from './cast'
import type {Drop} from './drop'

type CleanGaps<O extends any[]> = {
  [K in keyof O]: NonNullable<O[K]>
}

type Gaps<L extends any[]> = Cast<CleanGaps<{[K in keyof L]?: L[K]}>, any[]>

export type Curry<F extends (...args: any[]) => any> = <
  T extends any[],
  G = Drop<Length<T>, Parameters<F>>
>(
  ...args: Cast<T, Gaps<Parameters<F>>>
) => G extends [any, ...any[]]
  ? Curry<(...args: G) => ReturnType<F>>
  : ReturnType<F>
