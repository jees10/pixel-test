import { RequestFilters } from "src/common/interfaces/request-filters.interface"

export const mapFindOptionsInArray = <T>(array: T[], filter?: RequestFilters<T>): T[] => {  
  let filteredData = array;
  filter?.conditions && (filteredData = applyConditions(filter.conditions, filteredData));
  filter?.page && (filteredData = applyPagination(filter.page, filteredData));
  filter?.select && (filteredData = applySelect(filter.select, filteredData) as T[]);
  return filteredData;
}

export const mapFindOptionsForOne = <T>(array: T[], filter?: RequestFilters<T>): T => {
  let foundItem = {} as T;
  filter?.conditions && (foundItem = applyConditionsInOne(filter.conditions, array));
  return foundItem;
}

export const applyConditionsInOne = <T>(conditions: RequestFilters<T>['conditions'], array: T[]): T => {
  if (Array.isArray(conditions)) {
    return conditions.reduce((acc, c) => [...acc, ...applyConditions(c, array)], [])[0];
  } else {
    const currentFilters = conditions as Record<keyof T, any>;
    const filteredData = array.filter(i => Object.entries(currentFilters).every(([key, value]) => value !== undefined ? i[key] === value : true));
    return filteredData[0]
  }
}


export const applyConditions = <T>(conditions: RequestFilters<T>['conditions'], array: T[]): T[] => {
  if (Array.isArray(conditions)) {
    return conditions.reduce((acc, c) => [...acc, ...applyConditions(c, array)], []);
  } else {
    const currentFilters = conditions as Record<keyof T, any>;
    const filteredData = array.filter(i => Object.entries(currentFilters).every(([key, value]) => value !== undefined ? i[key] === value : true));
    return filteredData
  }
}

export const applyPagination = <T>(pagination: NonNullable<RequestFilters<T>['page']>, array: T[]): T[] => {
  const { pageIndex, size } = pagination;
  const total = array.length;
  const start = (pageIndex - 1) * size;
  const end = start + size;
  const paginated = array.slice(start, end);
  return paginated;
}

export const applySelect = <T>(select: NonNullable<RequestFilters<T>['select']>, array: T[]): Array<Partial<T>> => {
  const filteredData = array.map((i) => {
    const newObject = Object.entries(i as Record<string, any>)
      .filter(([key]) => select.includes(key as keyof T))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    return newObject
  });
  return filteredData;
}