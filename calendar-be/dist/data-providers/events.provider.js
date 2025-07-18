"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsDataProvider = void 0;
const base_provider_1 = require("../lib/base.provider");
class EventsDataProvider extends base_provider_1.BaseProvider {
    constructor(dataService) {
        super('events', dataService);
    }
}
exports.EventsDataProvider = EventsDataProvider;
//# sourceMappingURL=events.provider.js.map