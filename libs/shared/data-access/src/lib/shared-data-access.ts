import {StorageService} from './base/storage.service'

export function sharedDataProviders() {
  return [
    {
      provide: localStorage,
      useValue: localStorage,
    },
    {
      provide: StorageService,
      useFactory: (local: Storage) => new StorageService(local),
      deps: [localStorage],
    },
  ]
}
