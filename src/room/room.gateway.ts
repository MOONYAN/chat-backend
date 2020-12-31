import { FromClientMessageDto } from './dto/from-client-message.dto';
import { ToClientMessageDto } from './interface/to-client-message.dto';
import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ transports: ['websocket'], namespace: 'chat' })
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger = new Logger('Room');

  @WebSocketServer() wws: Server;

  afterInit(server: Server) {
    this.logger.log('init');
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('chatToServer')
  echoMessage(@MessageBody() dto: FromClientMessageDto): WsResponse<ToClientMessageDto> {
    this.logger.log(`Received Echo: ${dto.text}`)
    return {
      event: 'chatToClient',
      data: {
        name: 'server',
        text: `echo: ${dto.text}`
      }
    }
  }

  @SubscribeMessage('brocastToServer')
  brocastMessage(@MessageBody() dto: FromClientMessageDto) {
    this.logger.log(`Received Brocast: ${dto.text}`)
    this.brocastToClients({
      name: dto.name,
      text: dto.text
    } as ToClientMessageDto);
  }

  brocastToClients(dto: ToClientMessageDto) {
    this.wws.emit('chatToClient', dto)
  }
}
