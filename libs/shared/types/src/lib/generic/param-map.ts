export interface ParamMap {
  has(name: string): boolean
  get(name: string): string | null
  getAll(name: string): string[]
  readonly keys: string[]
}
