import {PeerAnswer, PeerConnection, PeerOffer} from '@contact/client/types'
import {PeerPayload, PeerSdpInit} from '@contact/inter/types'

export abstract class PeerService {
  abstract peer: PeerConnection
  abstract remote: MediaStream
  abstract local: MediaStream

  abstract get user(): string
  abstract get meet(): string
  abstract get accessToken(): string

  abstract onTrack(fn: (track: MediaStreamTrack) => void): void

  abstract createMessage<K extends keyof PeerPayload>(
    payload: PeerPayload[K]
  ): {
    payload: PeerPayload[K]
    accessToken: string
    user: string
    meet: string
  }

  abstract createOffer(options?: RTCOfferOptions): Promise<PeerOffer>

  abstract createAnswer(offer: PeerSdpInit): Promise<PeerAnswer>

  abstract close(): void
}
