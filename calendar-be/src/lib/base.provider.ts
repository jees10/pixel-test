import { Injectable, NotFoundException } from "@nestjs/common";
import { EntityToCreate, IEntity } from "src/common/interfaces/entity.interface";
import { RequestFilters } from "src/common/interfaces/request-filters.interface";
import { DataService } from "src/services/data.service";
import { mapFindOptionsForOne, mapFindOptionsInArray } from "src/utils/filter.util";

@Injectable()
export class BaseProvider<T extends IEntity> {

  collection: string;

  constructor(
    collection: string,
    private dataService: DataService
  ) {
    this.collection = collection;
  }

  findAll(filters?: RequestFilters<T>): T[] {
    const db = this.dataService.readDB();
    const results = db[this.collection] || [];
    const filteredResults = mapFindOptionsInArray(results, filters);
    return filteredResults
  }

  findById(id: number): T {
    const db = this.dataService.readDB();
    const item = db[this.collection].find((i) => i.id === +id);
    if (!item) throw new NotFoundException(`${this.collection} item not found`);
    return item;
  }

  findOneBy(filters?: Pick<RequestFilters<T>, 'conditions'>): T {
    const db = this.dataService.readDB();
    const results = db[this.collection] || [];
    const filteredItem = mapFindOptionsForOne(results, filters);
    return filteredItem;
  }

  count(filters?: Omit<RequestFilters<T>, 'page'>): { count: number } {
    const db = this.dataService.readDB();
    const results = db[this.collection] || [];
    const filteredResults = mapFindOptionsInArray(results, filters);
    return { count: filteredResults.length }
  }

  create(item: EntityToCreate): T {
    const db = this.dataService.readDB();
    const newItem = { id: Date.now(), ...item } as T;
    db[this.collection].push(newItem);
    this.dataService.writeDB(db);
    return newItem;
  }

  update(id: number, data: Partial<T>): T {
    const db = this.dataService.readDB();
    const index = db[this.collection].findIndex((i) => i.id === +id);
    if (index === -1) throw new NotFoundException(`${this.collection} item not found`);

    db[this.collection][index] = { ...db[this.collection][index], ...data };
    this.dataService.writeDB(db);
    return db[this.collection][index];
  }

  delete(id: number): boolean {
    const db = this.dataService.readDB();
    const index = db[this.collection].findIndex((i) => i.id === +id);
    if (index === -1) throw new NotFoundException(`${this.collection} item not found`);

    const [deleted] = db[this.collection].splice(index, 1);
    this.dataService.writeDB(db);
    return deleted;
  }
}