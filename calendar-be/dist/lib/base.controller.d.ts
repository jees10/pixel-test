import { BaseService } from "./base.service";
import { IEntity } from "src/common/interfaces/entity.interface";
export declare class BaseController<T extends IEntity> {
    private entityService;
    private createDtoClass;
    private updateDtoClass;
    entityName: string;
    constructor(entityName: string, entityService: BaseService<T>, createDtoClass: new () => any, updateDtoClass: new () => any);
    entityExists: (id: number) => unknown;
    findAll(filter: string): Promise<{}>;
    count(filter: string): Promise<{
        count: number;
    }>;
    findOne(id: number): unknown;
    create(newEntity: T): Promise<T_1>;
    update(id: number, entityToUpdate: Partial<T>): Promise<T>;
    remove(id: number): Promise<void | boolean>;
}
