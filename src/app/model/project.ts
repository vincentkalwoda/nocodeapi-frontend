import {Entity} from './entity';

export interface Project {
  apiKey: string;
  name: string;
  description?: string;
  createdAt: Date;
  entities: Entity[];
}
