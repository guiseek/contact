import {PeerMessage} from './peer-message'
import {PeerPayload} from './peer-payload'

export type PeerEvents = {
  [K in keyof PeerPayload]: (value: PeerMessage<K>) => void
}
