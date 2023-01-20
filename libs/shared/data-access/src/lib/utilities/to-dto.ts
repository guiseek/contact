type Constructor<T = unknown> = new (...params: unknown[]) => T

export const toDto = <D>(dto: Constructor<D>) => {
  return {
    async one<T extends D>(item: Promise<T>) {
      return new dto(await item)
    },
    async many<T extends D>(items: Promise<T[]>) {
      return (await items).map((item) => new dto(item))
    },
  }
}
