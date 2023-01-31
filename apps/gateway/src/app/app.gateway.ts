import {
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayInit,
} from '@nestjs/websockets'
import {Socket, Server} from 'socket.io'
import {PeerServerEvents} from '@contact/server/types'
import {PeerClientEvents} from '@contact/client/types'
import {
  PeerData,
  PeerEvent,
  PeerEvents,
  PeerMessage,
} from '@contact/inter/types'

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

@WebSocketGateway({cors: {origin: '*'}})
export class AppGateway {
  @WebSocketServer()
  server: SocketServer

  @SubscribeMessage(PeerEvent.Hello)
  async handleHello(
    @ConnectedSocket() client: SocketClient,
    @MessageBody() data: PeerMessage<'void'>
  ) {
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
