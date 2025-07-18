import { EntityToCreate, IEntity } from "src/common/interfaces/entity.interface";
import { RequestFilters } from "src/common/interfaces/request-filters.interface";
import { DataService } from "src/services/data.service";
export declare class BaseProvider<T extends IEntity> {
    private dataService;
    collection: string;
    constructor(collection: string, dataService: DataService);
    findAll(filters?: RequestFilters<T>): T[];
    findById(id: number): T;
    findOneBy(filters?: Pick<RequestFilters<T>, 'conditions'>): T;
    count(filters?: Omit<RequestFilters<T>, 'page'>): {
        count: number;
    };
    create(item: EntityToCreate): T;
    update(id: number, data: Partial<T>): T;
    delete(id: number): boolean;
}
