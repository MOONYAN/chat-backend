import { RoomGateway } from './room.gateway';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ToClientMessageDto } from './interface/to-client-message.dto';

@Injectable()
export class TaskService {

    private logger = new Logger(TaskService.name);

    constructor(private roomGateway: RoomGateway) { }

    @Cron('0 * * * * *')
    async handleCorn() {
        const msg = `On Time: ${new Date().toLocaleTimeString()}`;
        this.logger.log(msg);
        this.roomGateway.brocastToClients({
            name: 'server timer',
            text: msg
        } as ToClientMessageDto);
    }
}
