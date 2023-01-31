import {PeerSdpInit} from './peer-sdp-init'
import {PeerSdpType} from './peer-sdp-type'

export interface PeerSdp extends PeerSdpInit {
  readonly type: PeerSdpType
  readonly sdp: string
  toJSON(): PeerSdpInit
}
