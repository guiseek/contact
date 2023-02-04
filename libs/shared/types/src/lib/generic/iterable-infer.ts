export type IterableInfer<
  T extends Iterable<unknown> | AsyncIterable<unknown>
> = T extends Iterable<infer U> | AsyncIterable<infer U> ? U : never
