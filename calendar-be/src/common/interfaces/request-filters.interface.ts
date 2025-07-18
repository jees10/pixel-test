export interface RequestFilters<T> {
  conditions?: Array<Record<keyof T, any>> | Record<keyof T, any>,
  select?: Array<keyof T>,
  page?: {
    pageIndex: number,
    size: number
  },  
}