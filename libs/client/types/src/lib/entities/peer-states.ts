export type SignalingState =
  | 'closed'
  | 'have-local-offer'
  | 'have-local-pranswer'
  | 'have-remote-offer'
  | 'have-remote-pranswer'
  | 'stable'

export type ConnectionState =
  | 'closed'
  | 'connected'
  | 'connecting'
  | 'disconnected'
  | 'failed'
  | 'new'

export type IceConnectionState =
  | 'closed'
  | 'connected'
  | 'disconnected'
  | 'failed'
  | 'new'
  | 'checking'
  | 'completed'

export type IceGatheringState = 'new' | 'complete' | 'gathering'
