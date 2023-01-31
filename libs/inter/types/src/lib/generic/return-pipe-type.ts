import { Drop } from './drop'
import { Prepend } from './prepend'

export type ReturnPipeType<T extends unknown[]> = T extends [
  a: infer A,
  b: infer B,
  ...args: unknown[]
]
  ? A extends Promise<unknown>
    ? ReturnPipeType<Prepend<Drop<2, T>, Promise<Awaited<B>>>>
    : ReturnPipeType<Prepend<Drop<2, T>, B>>
  : T[0]
