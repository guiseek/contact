export interface SignalingMessage {
  meet: string
  user: string
  ice?: RTCIceCandidate
  sdp?: RTCSessionDescription
}
