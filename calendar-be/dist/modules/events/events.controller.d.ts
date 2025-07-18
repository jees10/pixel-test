import { Event } from 'src/common/interfaces/events.interface';
import { BaseController } from 'src/lib/base.controller';
import { EventsService } from './events.service';
export declare class EventsController extends BaseController<Event> {
    constructor(eventsService: EventsService);
}
