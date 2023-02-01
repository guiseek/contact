import {
  PeerOffer,
  PeerAnswer,
  PeerCandidate,
  PeerChannel,
} from '@contact/client/types'
import {PeerData, PeerEvent, PeerSdpInit} from '@contact/inter/types'
import {SignalingService} from '../domain/signaling.service'
import {State, freeze} from '@contact/shared/data-access'
import {PeerFacade} from '../domain/peer.facade'
import {PeerStateFacade} from '../domain/peer-state.facade'
import {PeerService} from '../domain/peer.service'

interface FullChannel {
  send: PeerChannel | null
  receive: PeerChannel | null
}

interface PeerState {
  // signaling: SignalingState
  // connection: ConnectionState
  // iceCandidate: PeerCandidate | null
  // iceConnection: IceConnectionState
  // iceGathering: IceGatheringState
  // channel: FullChannel
  user: string | null
  meet: string | null
  local: MediaStream
  remote: MediaStream
  error: string | null
  loading: boolean
}

const initialState: PeerState = freeze<PeerState>({
  error: null,
  loading: false,
  user: null,
  meet: null,
  local: new MediaStream(),
  remote: new MediaStream(),
})

export class PeerFacadeImpl extends State<PeerState> implements PeerFacade {
  loading$ = this.select((state) => state.loading)
  error$ = this.select((state) => state.error)
  user$ = this.select((state) => state.user)
  meet$ = this.select((state) => state.meet)
  remote$ = this.select((state) => state.remote)
  local$ = this.select((state) => state.local)

  // peer: PeerConnection

  constructor(
    private signalingService: SignalingService,
    private peerStateFacade: PeerStateFacade,
    private peerService: PeerService,
    // peerConfig: RTCConfiguration = {}
  ) {
    super(initialState)

    // this.peer = new PeerConnection(peerConfig)

    this.peerService.peer.onicecandidate = ({candidate}) => {
      // console.log(candidate)
      if (candidate) {
        this.candidate(new PeerCandidate(candidate))
      }
    }

    this.peerStateFacade.loadPeerStates(this.peerService.peer)

    let remote: MediaStream
    this.peerService.peer.ontrack = ({track}) => {
      if (track) {
        if (!remote) {
          remote = new MediaStream()
        }
        remote.addTrack(track)
        this.update('remote', remote)
      }
    }

    this.peerService.peer.onnegotiationneeded = () => this.createOffer()

    this.signalingService.on(PeerEvent.Candidate, (value) => {
      if (this.isFromAnotherUser(value)) {
        if (this.peerService.peer.remoteDescription !== null) {
          this.peerService.peer.addIceCandidate(new PeerCandidate(value.payload))
        }
      }
    })

    this.signalingService.on(PeerEvent.Offer, (value) => {
      if (this.isFromAnotherUser(value)) {
        console.log(this.peerService.peer.signalingState)
        this.createAnswer(value.payload)
      }
    })

    this.signalingService.on(PeerEvent.Answer, async (value) => {
      if (this.isFromAnotherUser(value)) {
        this.peerService.peer.setRemoteDescription(new PeerAnswer(value.payload))

        // this.peerService.peer.onsignalingstatechange = () => {
        //   if (this.peerService.peer.signalingState !== 'stable') {
        //   }
        // }
        // }
      }
    })
  }

  setStreams(...[stream]: MediaStream[]) {
    stream.getTracks().forEach((track) => {
      this.peerService.peer.addTrack(track, stream)
      this.update('local', stream)
    })
  }

  hello(data: PeerData) {
    this.signalingService.emit('hello', data)
    this.patch(data)
  }

  private createOffer(options?: RTCOfferOptions) {
    this.peerService
      .createOffer(options)
      .then((offer) => {
        this.peerService.peer.setLocalDescription(offer)
        return new PeerOffer(offer)
      })
      .then((offer) => this.offer(offer))
  }

  private async createAnswer(offer: PeerSdpInit) {
    return this.peerService.peer
      .setRemoteDescription(offer)
      .then(() => this.peerService.peer.createAnswer())
      .then((answer) => {
        this.peerService.peer.setLocalDescription(answer)
        return new PeerAnswer(answer)
      })
      .then((answer) => this.answer(answer))
  }

  private offer(payload: PeerOffer) {
    if (this.hasLocalData) {
      const message = {...this.hasLocalData, payload}
      this.signalingService.emit(PeerEvent.Offer, message)
    }
  }

  private answer(payload: PeerAnswer) {
    if (this.hasLocalData) {
      const message = {...this.hasLocalData, payload}
      this.signalingService.emit(PeerEvent.Answer, message)
    }
  }
  private candidate(payload: PeerCandidate) {
    if (this.hasLocalData) {
      const message = {...this.hasLocalData, payload}
      this.signalingService.emit(PeerEvent.Candidate, message)
    }
  }

  private isFromAnotherUser(value: PeerData) {
    return this.state.user !== value.user
  }
  private get hasLocalData() {
    const {user, meet} = this.state
    return !!(user && meet) && {user, meet}
  }

  close() {
    this.peerService.peer.close()
    this.state.remote.getTracks().forEach((track) => track.stop())
  }
}
