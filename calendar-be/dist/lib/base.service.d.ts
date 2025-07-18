import { BaseProvider } from "./base.provider";
import { IEntity } from "src/common/interfaces/entity.interface";
import { RequestFilters } from "src/common/interfaces/request-filters.interface";
export declare class BaseService<T extends IEntity> {
    dataProvider: BaseProvider<T>;
    constructor(dataProvider: BaseProvider<T>);
    findAll(query?: RequestFilters<T>): Promise<T[]>;
    findOneById(id: number): Promise<T>;
    count(query: RequestFilters<T>): Promise<{
        count: number;
    }>;
    create(entity: T): Promise<T>;
    update(id: number, fields: Partial<T>): Promise<T>;
    delete(id: number): Promise<boolean>;
}
