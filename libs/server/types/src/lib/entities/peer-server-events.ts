import {PeerEvents} from '@contact/inter/types'

export interface PeerServerEvents extends PeerEvents {
  joined: (user: string) => void
  exited: (user: string) => void
}
