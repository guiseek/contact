import {PeerServerEvents} from '@contact/server/types'
import {PeerClientEvents} from '@contact/client/types'
import {Callback, PeerCaller} from '@contact/shared/types'
import {Socket, io} from 'socket.io-client'
import {ClientService} from '../domain/client.service'

type SocketClient = Socket<PeerClientEvents, PeerServerEvents>

export class ClientServiceImpl implements ClientService {
  socket: SocketClient

  private _onConnect: Callback[] = []
  private _onRing: Callback<PeerCaller>[] = []

  constructor(url = 'ws://localhost:3333/user') {
    this.socket = io(url)
    this.socket.on('connect', () => {
      this._onConnect.forEach((fn) => fn())
    })
    this.socket.on('ring', (data) => {
      this._onRing.forEach((fn) => fn(data))
    })
  }

  set onConnect(fn: Callback) {
    this._onConnect.push(fn)
  }

  set onRing(fn: Callback<PeerCaller>) {
    this._onRing.push(fn)
  }

  register(id: number) {
    this.socket.emit('register', id)
  }

  call(data: PeerCaller) {
    this.socket.emit('call', data)
  }
}
