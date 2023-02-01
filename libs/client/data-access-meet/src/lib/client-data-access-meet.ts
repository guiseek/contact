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

export function clientDataAccessMeet(peerConfig: RTCConfiguration = {}) {
  return [
    {
      provide: SignalingService,
      useFactory: () => new SignalingServiceImpl(),
    },
    {
      provide: PeerService,
      useFactory: (
        storage: StorageService<PeerData>,
        signaling: SignalingService
      ) => new PeerServiceImpl(storage, signaling, peerConfig),
      deps: [StorageService, SignalingService],
    },
    {
      provide: PeerStateFacade,
      useFactory: () => new PeerStateFacadeImpl(),
    },
    {
      provide: PeerFacade,
      useFactory: (
        signaling: SignalingService,
        peerState: PeerStateFacade,
        peer: PeerService
      ) => {
        return new PeerFacadeImpl(signaling, peerState, peer)
      },
      deps: [SignalingService, PeerStateFacade, PeerService],
    },
  ]
}
