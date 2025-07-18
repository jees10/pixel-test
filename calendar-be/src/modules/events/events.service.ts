import { Inject, Injectable } from '@nestjs/common';
import { EVENTS_REPOSITORY } from 'src/common/constants/repositories';
import { Event } from 'src/common/interfaces/events.interface';
import { EventsDataProvider } from 'src/data-providers/events.provider';
import { BaseService } from 'src/lib/base.service';

@Injectable()
export class EventsService extends BaseService<Event> {

  constructor(
    @Inject(EVENTS_REPOSITORY)
    eventProvider: EventsDataProvider
  ) {
    super(eventProvider);
  }
}
