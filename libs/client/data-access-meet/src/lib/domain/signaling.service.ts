import {PeerClientEvents} from '@contact/client/types'
import {PeerServerEvents} from '@contact/server/types'
import {Socket} from 'socket.io-client'

export abstract class SignalingService {
  abstract provider: Socket

  abstract emit<Ev extends keyof (PeerServerEvents & PeerClientEvents)>(
    ev: Ev,
    ...value: Parameters<(PeerServerEvents & PeerClientEvents)[Ev]>
  ): void

  abstract on<Ev extends keyof (PeerServerEvents & PeerClientEvents)>(
    ev: Ev,
    fn: (PeerServerEvents & PeerClientEvents)[Ev]
  ): void
}
