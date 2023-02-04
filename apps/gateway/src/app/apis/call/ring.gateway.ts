import {
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets'
import {Socket, Server} from 'socket.io'
import {PeerServerEvents} from '@contact/server/types'
import {PeerClientEvents} from '@contact/client/types'
import {
  PeerData,
  PeerEvent,
  PeerEvents,
  PeerMessage,
} from '@contact/shared/types'
import {ExecutionContext, createParamDecorator} from '@nestjs/common'
import {UserService} from '../../data'
type SocketServer = Server<
  PeerClientEvents,
  PeerServerEvents,
  PeerEvents,
  PeerData
>
type SocketClient = Socket<
  PeerClientEvents,
  PeerServerEvents,
  PeerEvents,
  PeerData
>

interface RingToUser {
  source: number
  target: number
}
interface ClientUser {
  client: string
  active: boolean
}
interface UserClient {
  user: number
  client: string
}

@WebSocketGateway({ cors: {origin: '*'}, namespace: 'ring' })
export class RingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  registry = new Map<number, ClientUser>()

  constructor(private usersService: UserService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    this.server.emit('aloha', {client: client.id})
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    for (const room of client.rooms) {
      if (room !== client.id) {
        client
          .to(room)
          .emit(PeerEvent.Message, `user ${client.id} has left room`)
      }
    }
  }

  @SubscribeMessage('register')
  async handleRegister(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: UserClient
  ) {
    console.log(data);
    this.registry.set(data.user, {client: data.client, active: true})
    console.log(this.registry);
  }

  @SubscribeMessage('ring')
  async handleCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: RingToUser
  ) {
    // console.log(data);
    const target = this.registry.get(data.source)
    console.log(target);

    this.server.to(target.client).emit('ring', {user: data.source})
  }
}
