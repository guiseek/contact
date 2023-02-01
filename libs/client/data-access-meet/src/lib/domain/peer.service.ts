import {
  PeerAnswer,
  PeerCandidate,
  PeerConnection,
  PeerOffer,
} from '@contact/client/types'
import {PeerData, PeerPayload, PeerSdpInit} from '@contact/inter/types'

export abstract class PeerService {
  abstract peer: PeerConnection
  abstract remote: MediaStream
  abstract local: MediaStream

  abstract get user(): string
  abstract get meet(): string

  abstract onTrack(fn: (track: MediaStreamTrack) => void): void

  abstract createMessage<K extends keyof PeerPayload>(
    payload: PeerPayload[K]
  ): {
    payload: PeerPayload[K]
    user: string
    meet: string
  }

  abstract createOffer(options?: RTCOfferOptions): Promise<PeerOffer>

  abstract createAnswer(offer: PeerSdpInit): Promise<PeerAnswer>

  abstract close(): void

  abstract hello(data: PeerData): void

  abstract setStreams(...streams: MediaStream[]): void

  abstract offer(payload: PeerOffer): void

  abstract answer(payload: PeerAnswer): void

  abstract candidate(payload: PeerCandidate): void

  abstract get hasLocalData(): PeerData
}
