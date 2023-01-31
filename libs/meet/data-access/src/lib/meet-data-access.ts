import {StorageService} from '@contact/shared/data-access'
import {PeerFacadeImpl} from './applications/peer.facade.impl'
import {PeerFacade} from './domain/peer.facade'
import {SignalingService} from './domain/signaling.service'
import {SignalingServiceImpl} from './infrastructure/signaling.service.impl'
import {PeerStateFacade} from './domain/peer-state.facade'
import {PeerStateFacadeImpl} from './applications/peer-state.facade.impl'

export function meetDataAccess(): string {
  return 'meet-data-access'
}

export function meetDataProviders(peerConfig: RTCConfiguration = {}) {
  return [
    {
      provide: SignalingService,
      useFactory: () => new SignalingServiceImpl(),
    },
    {
      provide: PeerStateFacade,
      useFactory: () => new PeerStateFacadeImpl(),
    },
    {
      provide: PeerFacade,
      useFactory: (signaling: SignalingService, peerState: PeerStateFacade) => {
        return new PeerFacadeImpl(signaling, peerState, peerConfig)
      },
      deps: [SignalingService, PeerStateFacade],
    },
  ]
}
