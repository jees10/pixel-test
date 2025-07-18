import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { DataProvidersModule } from 'src/data-providers/data-providers.module';

@Module({
  imports: [DataProvidersModule],
  providers: [EventsService],
  controllers: [EventsController],
  exports: [EventsService]
})
export class EventsModule {}
