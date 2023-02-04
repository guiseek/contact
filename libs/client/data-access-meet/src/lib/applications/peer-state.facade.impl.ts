import {
  ConnectionState,
  PeerConnection,
  SignalingState,
} from '@contact/client/types'
import {State, freeze} from '@contact/shared/data-access'
import {distinctUntilChanged, filter} from 'rxjs'
import {PeerStateFacade} from '../domain/peer-state.facade'

interface PeerState {
  signaling: SignalingState
  connection: ConnectionState
}

const initialState = freeze<PeerState>({
  signaling: 'stable',
  connection: 'closed',
})

export class PeerStateFacadeImpl
  extends State<PeerState>
  implements PeerStateFacade
{
  signaling$ = this.select((state) => state.signaling)
  connection$ = this.select((state) => state.connection)

  retryAfterConnecting$ = this.connection$.pipe(
    filter((state) => state === 'disconnected'),
    distinctUntilChanged((prev, curr) => {
      return prev !== 'disconnected' && curr === 'connecting'
    })
  )

  retryAfterDisconnected$ = this.connection$.pipe(
    filter((state) => state === 'disconnected'),
    distinctUntilChanged((prev, curr) => {
      return prev !== 'disconnected' && curr === 'disconnected'
    })
  )

  connected$ = this.connection$.pipe(filter((state) => state === 'connected'))

  disconnected$ = this.connection$.pipe(
    filter((state) => state === 'disconnected')
  )

  constructor() {
    super(initialState)
  }

  loadPeerStates(peer: PeerConnection) {
    peer.onsignalingstatechange = () => {
      this.update('signaling', peer.signalingState)
    }

    peer.onconnectionstatechange = () => {
      this.update('connection', peer.connectionState)
    }
  }
}
