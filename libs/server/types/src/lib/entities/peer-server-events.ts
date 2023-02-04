import {PeerCaller, PeerEvents} from '@contact/shared/types'

export interface PeerServerEvents extends PeerEvents {
  joined: (user: string) => void
  exited: (user: string) => void
  message: (message: string) => void
  register: (userId: number) => void
  call: (userId: PeerCaller) => void
}
