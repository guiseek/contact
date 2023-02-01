import {
  PeerOffer,
  PeerAnswer,
  PeerCandidate,
  PeerConnection,
} from '@contact/client/types'
import {
  PeerData,
  PeerEvent,
  PeerPayload,
  PeerSdpInit,
} from '@contact/inter/types'
import {SignalingService} from '../domain/signaling.service'
import {StorageService} from '@contact/shared/data-access'
import {PeerService} from '../domain/peer.service'

export class PeerServiceImpl implements PeerService {
  peer: PeerConnection
  remote = new MediaStream()
  local = new MediaStream()

  get user() {
    return this.storageService.getItem('user') ?? ''
  }
  get meet() {
    return this.storageService.getItem('meet') ?? ''
  }

  constructor(
    private storageService: StorageService<PeerData>,
    private signalingService: SignalingService,
    peerConfig: RTCConfiguration = {}
  ) {
    this.peer = new PeerConnection(peerConfig)
  }

  hello(data: PeerData) {
    this.signalingService.emit('hello', data)
  }

  setStreams(...[stream]: MediaStream[]): void {
    stream.getTracks().forEach((track) => {
      this.peer.addTrack(track, stream)
    })
  }

  offer(payload: PeerOffer): void {
    const message = this.createMessage<'offer'>(payload)
    this.signalingService.emit(PeerEvent.Offer, message)
  }

  answer(payload: PeerAnswer): void {
    const message = this.createMessage<'answer'>(payload)
    this.signalingService.emit(PeerEvent.Answer, message)
  }

  candidate(payload: PeerCandidate): void {
    const message = this.createMessage<'candidate'>(payload)
    this.signalingService.emit(PeerEvent.Candidate, message)
  }

  get hasLocalData(): PeerData {
    return {
      user: this.user,
      meet: this.meet,
    }
  }

  createMessage<K extends keyof PeerPayload>(payload: PeerPayload[K]) {
    return {...this.hasLocalData, payload}
  }

  onTrack(fn: (track: MediaStreamTrack) => void) {
    this.peer.ontrack = ({track}) => {
      if (track) fn(track)
    }
  }

  async createOffer(options?: RTCOfferOptions) {
    return this.peer.createOffer(options).then((offer) => {
      this.peer.setLocalDescription(offer)
      return new PeerOffer(offer)
    })
  }

  async createAnswer(offer: PeerSdpInit) {
    return this.peer
      .setRemoteDescription(offer)
      .then(() => this.peer.createAnswer())
      .then((answer) => {
        this.peer.setLocalDescription(answer)
        return new PeerAnswer(answer)
      })
  }

  close() {
    this.peer.close()
    this.local.getTracks().forEach((track) => track.stop())
  }
}
