import {PeerConnection} from '@contact/client/types'
import {Observable} from 'rxjs'

export abstract class PeerStateFacade {
  abstract signaling$: Observable<RTCSignalingState>

  abstract connection$: Observable<RTCPeerConnectionState>

  abstract retryAfterConnecting$: Observable<RTCPeerConnectionState>

  abstract retryAfterDisconnected$: Observable<RTCPeerConnectionState>

  abstract disconnected$: Observable<RTCPeerConnectionState>

  abstract loadPeerStates(peer: PeerConnection): void
}
