import {PeerSdpType} from './peer-sdp-type'

export interface PeerSdpInit {
  type: PeerSdpType
  sdp?: string
}
