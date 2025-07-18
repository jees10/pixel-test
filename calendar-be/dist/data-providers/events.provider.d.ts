import { Event } from "src/common/interfaces/events.interface";
import { BaseProvider } from "src/lib/base.provider";
import { DataService } from "src/services/data.service";
export declare class EventsDataProvider extends BaseProvider<Event> {
    constructor(dataService: DataService);
}
