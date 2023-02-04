import {StorageService} from './base/storage.service'

const LOCAL_STORAGE_PROVIDER = {
  provide: localStorage,
  useValue: localStorage,
}

const STORAGE_SERVICE_PROVIDER = {
  provide: StorageService,
  useFactory: (local: Storage) => new StorageService(local),
  deps: [localStorage],
}

export const SHARED_PROVIDERS = [
  LOCAL_STORAGE_PROVIDER,
  STORAGE_SERVICE_PROVIDER
]
