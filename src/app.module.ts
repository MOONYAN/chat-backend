import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    RoomModule,
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
