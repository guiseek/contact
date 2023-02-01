import {PeerPayload} from './peer-payload'
import {PeerData} from './peer-data'

export interface PeerMessage<K extends keyof PeerPayload> extends PeerData {
  payload: PeerPayload[K]
}
