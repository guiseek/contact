import 'jest-preset-angular/setup-jest'

const MOCK_DEVICES = [
  {
    deviceId:
      'c4930132e9602b05d3fc0e10437402cbe724db4bb8646a21518384cd8190886c',
    kind: 'audioinput',
    label: '',
    groupId: 'c4930132e9602b05d3fc0e10437402cbe724db4bb8646a21518384cd8190886c',
  },
  {
    deviceId:
      '7d654941f69262300c646d4b9070db181abba49a33111fd79f7ecee052e2b285',
    kind: 'videoinput',
    label: '',
    groupId: '7d654941f69262300c646d4b9070db181abba49a33111fd79f7ecee052e2b285',
  },
  {
    deviceId:
      '0a157e400f89cf7b9d7f126ca26e019e15f4f8a2745c5b07eb19e036bb3e5362',
    kind: 'audiooutput',
    label: '',
    groupId: '0a157e400f89cf7b9d7f126ca26e019e15f4f8a2745c5b07eb19e036bb3e5362',
  },
]

Object.defineProperty(navigator, 'mediaDevices', {
  value: {
    enumerateDevices() {
      return Promise.resolve(MOCK_DEVICES)
    },
  },
})

Object.defineProperty(window, 'RTCPeerConnection', {
  value: class {
    addEventListener = jest.fn()
    removeEventListener = jest.fn()
    createOffer = jest.fn()
    createAnswer = jest.fn()
    setLocalDescription = jest.fn()
    setRemoteDescription = jest.fn()
    addIceCandidate = jest.fn()
    iceGatheringState = 'gathering'
    iceConnectionState = 'connected'
    signalingState = 'stable'
    getSenders = jest.fn()
    getReceivers = jest.fn()
    getStats = jest.fn()
    close = jest.fn()
    onicecandidate = null
    oniceconnectionstatechange = null
    onsignalingstatechange = null
    ontrack = null
    onaddstream = null
    onremovestream = null
    onnegotiationneeded = null
    onconnectionstatechange = null
    ondatachannel = null
    onicegatheringstatechange = null
    onidentityresult = null
    onidentitychange = null
    createDataChannel(label: string, dataChannelDict?: RTCDataChannelInit) {
      return {
        send(data: string) {
          return
        },
        addEventListener(type: string, listener: any) {
          return
        },
      } as RTCDataChannel
    }
  },
})

Object.defineProperty(window, 'RTCIceCandidate', {
  value: class implements RTCIceCandidate {
    address = null
    candidate = ''
    component = null
    foundation = null
    port = null
    priority = null
    protocol = null
    relatedAddress = null
    relatedPort = null
    sdpMLineIndex = null
    sdpMid = null
    tcpType = null
    type = null
    usernameFragment = null
    toJSON = jest.fn()
  },
})

Object.defineProperty(window, 'RTCDataChannel', {
  value: class implements RTCDataChannel {
    binaryType: BinaryType = 'arraybuffer'
    bufferedAmount = 0
    bufferedAmountLowThreshold = 0
    id = 1
    label = ''
    maxPacketLifeTime = 1
    maxRetransmits = 2
    negotiated = false
    onbufferedamountlow = jest.fn()
    onclose = jest.fn()
    onclosing = jest.fn()
    onerror = jest.fn()
    onmessage = jest.fn()
    onopen = jest.fn()
    ordered = true
    protocol = 'udp'
    readyState: RTCDataChannelState = 'connecting'
    close = jest.fn()
    send = jest.fn()
    addEventListener = jest.fn()
    removeEventListener = jest.fn()
    dispatchEvent = jest.fn()
  },
})

Object.defineProperty(window, 'RTCSessionDescription', {
  value: class implements RTCSessionDescription {
    sdp = ''
    type: RTCSdpType = 'offer'
    toJSON = jest.fn()
  },
})

Object.defineProperty(window, 'MediaStream', {
  value: class implements MediaStream {
    active = false
    id = 'qwe'
    onaddtrack = jest.fn()
    onremovetrack = jest.fn()
    addTrack = jest.fn()
    clone = jest.fn()
    getAudioTracks = jest.fn()
    getTrackById = jest.fn()
    getTracks = jest.fn()
    getVideoTracks = jest.fn()
    removeTrack = jest.fn()
    addEventListener = jest.fn()
    removeEventListener = jest.fn()
    dispatchEvent = jest.fn()
  },
})
