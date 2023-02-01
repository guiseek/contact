import {PeerData, PeerEvents} from '@contact/shared/types'

export interface PeerClientEvents extends PeerEvents {
  hello: (value: PeerData) => void
}
