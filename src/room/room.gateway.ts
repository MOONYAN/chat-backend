import { FromClientMessageDto } from './dto/from-client-message.dto';
import { ToClientMessageDto } from './interface/to-client-message.dto';
import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ transports: ['websocket'] })
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
  handleMessage(@MessageBody() dto: FromClientMessageDto) {
    this.logger.log(`Received: ${dto.text}`)
    this.brocast({
      name: dto.name,
      text: dto.text
    } as ToClientMessageDto);
  }

  private brocast(dto: ToClientMessageDto) {
    this.wws.emit('chatToClient', dto)
  }
}
