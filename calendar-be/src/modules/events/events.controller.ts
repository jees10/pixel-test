import { Controller } from '@nestjs/common';
import { Event } from 'src/common/interfaces/events.interface';
import { BaseController } from 'src/lib/base.controller';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from 'src/common/dtos/event.dto';

@Controller('events')
export class EventsController extends BaseController<Event> {
  constructor(
      eventsService: EventsService
    ) {
      super('Event', eventsService, CreateEventDto, UpdateEventDto)
    }
}
