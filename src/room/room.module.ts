import { Module } from '@nestjs/common';
import { RoomGateway } from './room.gateway';
import { TaskService } from './task.service';

@Module({
  providers: [RoomGateway, TaskService]
})
export class RoomModule {}
