import {PeerAnswer, PeerConnection, PeerOffer} from '@contact/client/types'
import {PeerData, PeerPayload, PeerSdpInit} from '@contact/inter/types'
import {StorageService} from '@contact/shared/data-access'
import {PeerService} from '../domain/peer.service'

interface PeerStorage extends PeerData {
  accessToken: string
}

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
  get accessToken() {
    return this.storageService.getItem('accessToken') ?? ''
  }

  constructor(
    private storageService: StorageService<PeerStorage>,
    peerConfig: RTCConfiguration = {}
  ) {
    this.peer = new PeerConnection(peerConfig)
  }

  createMessage<K extends keyof PeerPayload>(payload: PeerPayload[K]) {
    const {user, meet, accessToken} = this
    return {accessToken, user, meet, payload}
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
