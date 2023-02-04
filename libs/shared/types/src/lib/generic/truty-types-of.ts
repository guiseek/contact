import type {Falsy} from './falsy'

export type TruthyTypesOf<T> = T extends Falsy ? never : T
