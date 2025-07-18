import { RequestFilters } from "src/common/interfaces/request-filters.interface";
export declare const mapFindOptionsInArray: <T>(array: T[], filter?: RequestFilters<T>) => T[];
export declare const mapFindOptionsForOne: <T>(array: T[], filter?: RequestFilters<T>) => T;
export declare const applyConditionsInOne: <T>(conditions: RequestFilters<T>["conditions"], array: T[]) => T;
export declare const applyConditions: <T>(conditions: RequestFilters<T>["conditions"], array: T[]) => T[];
export declare const applyPagination: <T>(pagination: NonNullable<RequestFilters<T>["page"]>, array: T[]) => T[];
export declare const applySelect: <T>(select: NonNullable<RequestFilters<T>["select"]>, array: T[]) => Array<Partial<T>>;
