import { Injectable } from "@nestjs/common";
import { BaseProvider } from "./base.provider";
import { IEntity } from "src/common/interfaces/entity.interface";
import { RequestFilters } from "src/common/interfaces/request-filters.interface";

@Injectable()
export class BaseService<T extends IEntity> {

  constructor(
    public dataProvider: BaseProvider<T>,    
  ) { }

  async findAll(query?: RequestFilters<T>): Promise<T[]> {    
    return this.dataProvider.findAll(query);
  }

  async findOneById(id: number): Promise<T> {    
    return this.dataProvider.findById(id);
  }  

  async count(query: RequestFilters<T>): Promise<{ count: number }> {    
    return this.dataProvider.count(query);    
  }

  async create(entity: T): Promise<T> {
    return this.dataProvider.create(entity);
  }

  async update(id: number, fields: Partial<T>): Promise<T> {
    return this.dataProvider.update(id, fields);
  }

  async delete(id: number): Promise<boolean> {
    return this.dataProvider.delete(id);
  }
}