type CallbackFilter<T> = (value: T) => boolean

const filterFn =
  <T>(values: T[]) =>
  (fn: CallbackFilter<T>) => {
    return values.filter(fn)
  }

const list = [{id: 0, name: 'Gui'}]

const listFilter = filterFn(list)

listFilter((item) => {
  return item.id === 1
})

export const deviceFilterByKind = (kind: MediaDeviceKind) => (device: MediaDeviceInfo) => device.kind === kind
