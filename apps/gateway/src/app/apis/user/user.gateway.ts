import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import {Socket} from 'socket.io'
import {ClientService} from '../../data/user/ports'
import {PeerCaller} from '@contact/shared/types'

@WebSocketGateway({namespace: 'user'})
export class UserGateway implements OnGatewayDisconnect {
  constructor(private readonly clientService: ClientService) {}

  @SubscribeMessage('register')
  handleRegister(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: number
  ) {
    this.clientService.save(client.id, userId)
  }

  @SubscribeMessage('call')
  handleRing(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: PeerCaller
  ) {
    this.clientService.findByUser(data.target).then((c) => {
      client.to(c.id).emit('ring', data)
    })
  }

  @SubscribeMessage('accept')
  handleAccept(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: PeerCaller
  ) {
    this.clientService.findByUser(data.source).then((c) => {
      client.to(c.id).emit('open', data)
    })
  }

  @SubscribeMessage('deny')
  handleDeny(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: PeerCaller
  ) {
    this.clientService.findByUser(data.source).then((c) => {
      client.to(c.id).emit('close', data)
    })
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.clientService.removeByClient(client.id)
  }
}
