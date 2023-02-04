export const Type = Function

export interface Type<T> extends Function {
  new (...args: any[]): T
}

export function isType(v: any): v is Type<any> {
  return typeof v === 'function'
}
