import {PeerIceInit} from './peer-ice-init'
import {PeerSdpInit} from './peer-sdp-init'

export interface PeerPayload {
  void: void
  offer: PeerSdpInit
  answer: PeerSdpInit
  candidate: PeerIceInit
}
