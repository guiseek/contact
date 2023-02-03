import {
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayDisconnect,
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

export const Logged = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log(ctx)
    // console.log(data);

    const client = ctx.switchToWs().getClient()
    console.log(client)

    const {user} = client
    return user
  }
)

@WebSocketGateway({cors: {origin: '*'}})
export class AppGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: SocketServer

  onInit() {
    this.server.use(async (socket, next) => {
      try {
        // const user = await fetch(socket)
      } catch (e) {
        next(new Error('User not found'))
      }
    })
  }

  handleDisconnect(@ConnectedSocket() client: SocketClient) {
    for (const room of client.rooms) {
      if (room !== client.id) {
        client.to(room).emit(PeerEvent.Message, `user ${client.id} has left room`)
      }
    }
  }

  @SubscribeMessage(PeerEvent.Hello)
  async handleHello(
    @Logged() user: any,
    @ConnectedSocket() client: SocketClient,
    @MessageBody() data: PeerMessage<'void'>
  ) {
    console.log(user)
    client.data = data
    if (!client.rooms.has(data.meet)) {
      await client.join(data.meet)
    }
    const room = this.getRoom(data.meet)
    if (!client.rooms.has(data.user)) {
      room.add(data.user)
    }

    client.to(data.meet).emit(PeerEvent.Joined, data.user)
  }

  @SubscribeMessage(PeerEvent.Offer)
  async handleOffer(
    @ConnectedSocket() client: SocketClient,
    @MessageBody() data: PeerMessage<'offer'>
  ) {
    if (client.rooms.has(data.meet)) {
      const room = this.server.to(data.meet)
      room.emit(PeerEvent.Offer, data)
    }
  }

  @SubscribeMessage(PeerEvent.Answer)
  handleAnswer(
    @ConnectedSocket() client: SocketClient,
    @MessageBody() data: PeerMessage<'answer'>
  ) {
    if (client.rooms.has(data.meet)) {
      const room = this.server.to(data.meet)
      room.emit(PeerEvent.Answer, data)
    }
  }

  @SubscribeMessage(PeerEvent.Candidate)
  handleCandidate(
    @ConnectedSocket() client: SocketClient,
    @MessageBody() data: PeerMessage<'candidate'>
  ) {
    if (client.rooms.has(data.meet)) {
      const room = this.server.to(data.meet)
      room.emit(PeerEvent.Candidate, data)
    }
  }

  private getRoom(id: string) {
    return this.server.sockets.adapter.rooms.get(id)
  }
}
