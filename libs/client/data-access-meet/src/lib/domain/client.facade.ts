import {PeerCaller} from '@contact/shared/types'
import {Observable} from 'rxjs'

export abstract class ClientFacade {
  abstract readonly connect$: Observable<void>
  abstract readonly ring$: Observable<PeerCaller>

  abstract register(id: number): void
  abstract call(data: PeerCaller): void
}
