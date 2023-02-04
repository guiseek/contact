import {StorageService} from '@contact/shared/data-access'
import {PeerFacadeImpl} from './applications/peer.facade.impl'
import {PeerFacade} from './domain/peer.facade'
import {SignalingService} from './domain/signaling.service'
import {SignalingServiceImpl} from './infrastructure/signaling.service.impl'
import {PeerStateFacade} from './domain/peer-state.facade'
import {PeerStateFacadeImpl} from './applications/peer-state.facade.impl'
import {PeerService} from './domain/peer.service'
import {PeerServiceImpl} from './infrastructure/peer.service.impl'
import {PeerData} from '@contact/shared/types'
import {ClientService} from './domain/client.service'
import {ClientServiceImpl} from './infrastructure/client.service.impl'
import {ClientFacade} from './domain/client.facade'
import {ClientFacadeImpl} from './applications/client.facade.impl'

export class PeerConfig implements RTCConfiguration {
  bundlePolicy?: RTCBundlePolicy
  certificates?: RTCCertificate[]
  iceCandidatePoolSize?: number
  iceServers?: RTCIceServer[]
  iceTransportPolicy?: RTCIceTransportPolicy
  rtcpMuxPolicy?: 'require'

  constructor(config: RTCConfiguration) {
    Object.assign(this, config)
  }
}

const MEET_SIGNALING_PROVIDER = {
  provide: SignalingService,
  useFactory: () => new SignalingServiceImpl(),
}

const MEET_CLIENT_SERVICE_PROVIDER = {
  provide: ClientService,
  useFactory: () => new ClientServiceImpl(),
}

const MEET_PEER_SERVICE_PROVIDER = {
  provide: PeerService,
  useFactory: (
    storage: StorageService<PeerData>,
    signaling: SignalingService,
    peerConfig: PeerConfig
  ) => new PeerServiceImpl(storage, signaling, peerConfig),
  deps: [StorageService, SignalingService, PeerConfig],
}

const MEET_PEER_STATE_FACADE_PROVIDER = {
  provide: PeerStateFacade,
  useFactory: () => new PeerStateFacadeImpl(),
}

const MEET_PEER_FACADE_PROVIDER = {
  provide: PeerFacade,
  useFactory: (
    signaling: SignalingService,
    peerState: PeerStateFacade,
    peer: PeerService
  ) => {
    return new PeerFacadeImpl(signaling, peerState, peer)
  },
  deps: [SignalingService, PeerStateFacade, PeerService],
}

const MEET_CLIENT_FACADE_PROVIDER = {
  provide: ClientFacade,
  useFactory: (client: ClientService) => {
    return new ClientFacadeImpl(client)
  },
  deps: [ClientService],
}

export const CLIENT_MEET_PROVIDERS = [
  MEET_SIGNALING_PROVIDER,
  MEET_CLIENT_SERVICE_PROVIDER,
  MEET_PEER_SERVICE_PROVIDER,
  MEET_PEER_STATE_FACADE_PROVIDER,
  MEET_PEER_FACADE_PROVIDER,
  MEET_CLIENT_FACADE_PROVIDER,
]
