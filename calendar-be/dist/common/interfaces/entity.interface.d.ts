export interface IEntity {
    id: number;
}
export type EntityToCreate = Omit<IEntity, 'id'>;
