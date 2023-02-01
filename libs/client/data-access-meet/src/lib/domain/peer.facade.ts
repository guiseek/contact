import {PeerData} from '@contact/shared/types'
import {Observable} from 'rxjs'

export abstract class PeerFacade {
  abstract loading$: Observable<boolean>

  abstract error$: Observable<string | null>

  abstract remote$: Observable<MediaStream>
  abstract local$: Observable<MediaStream>

  abstract setStreams(...streams: MediaStream[]): void
  abstract hello(data: PeerData): void
}
