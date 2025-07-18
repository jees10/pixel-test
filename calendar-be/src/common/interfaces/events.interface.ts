import { IEntity } from "./entity.interface";

export interface Event extends IEntity {
  title: string;
  description: string;
  date: Date;
  category: string
}