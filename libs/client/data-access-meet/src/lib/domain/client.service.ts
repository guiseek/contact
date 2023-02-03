import {Callback, PeerCaller} from '@contact/shared/types'

export abstract class ClientService {
  abstract set onConnect(fn: Callback)
  abstract set onRing(fn: Callback<PeerCaller>)

  abstract register(id: number): void
  abstract call(data: PeerCaller): void
}
