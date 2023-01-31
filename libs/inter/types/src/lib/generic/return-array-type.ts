import type { IterableInfer } from './iterable-infer'

export type ReturnArrayType<T extends Iterable<unknown> | AsyncIterable<unknown>> =
  T extends Iterable<unknown>
    ? IterableInfer<T>[]
    : T extends AsyncIterable<unknown>
    ? Promise<IterableInfer<T>[]>
    : never
