import {PeerData, PeerEvents} from '@contact/inter/types'

export interface PeerClientEvents extends PeerEvents {
  hello: (value: PeerData) => void
}
