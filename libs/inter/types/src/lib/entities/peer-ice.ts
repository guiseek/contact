import {PeerIceInit} from './peer-ice-init'

export interface PeerIce extends PeerIceInit {
  readonly candidate: string
  readonly sdpMLineIndex?: number | null
  readonly sdpMid?: string | null
  readonly usernameFragment?: string | null
  toJSON(): PeerIceInit
}
