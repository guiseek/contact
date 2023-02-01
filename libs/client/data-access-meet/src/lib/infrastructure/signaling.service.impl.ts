import {PeerClientEvents} from '@contact/client/types'
import {PeerServerEvents} from '@contact/server/types'
import {Socket, io} from 'socket.io-client'
import {SignalingService} from '../domain/signaling.service'

export class SignalingServiceImpl implements SignalingService {
  provider: Socket

  constructor(url = 'http://localhost:3333') {
    this.provider = io(url)
  }

  emit<Ev extends keyof (PeerServerEvents & PeerClientEvents)>(
    ev: Ev,
    ...value: Parameters<(PeerServerEvents & PeerClientEvents)[Ev]>
  ) {
    this.provider.emit(ev, ...value)
  }

  on<Ev extends keyof (PeerServerEvents & PeerClientEvents)>(
    ev: Ev,
    fn: (PeerServerEvents & PeerClientEvents)[Ev]
  ) {
    this.provider.on(ev, fn as any)
  }
}
