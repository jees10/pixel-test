import { Event } from 'src/common/interfaces/events.interface';
import { EventsDataProvider } from 'src/data-providers/events.provider';
import { BaseService } from 'src/lib/base.service';
export declare class EventsService extends BaseService<Event> {
    constructor(eventProvider: EventsDataProvider);
}
