import {Subject} from 'rxjs'
import {PeerCaller} from '@contact/shared/types'
import {ClientService} from '../domain/client.service'

export class ClientFacadeImpl {
  private _connect = new Subject<void>()
  readonly connect$ = this._connect.asObservable()

  private _ring = new Subject<PeerCaller>()
  readonly ring$ = this._ring.asObservable()

  constructor(private clientService: ClientService) {
    this.clientService.onConnect = () => {
      this._connect.next()
    }

    this.clientService.onRing = (caller) => {
      this._ring.next(caller)
    }
  }

  register(id: number) {
    this.clientService.register(id)
  }

  call(data: PeerCaller) {
    this.clientService.call(data)
  }
}
