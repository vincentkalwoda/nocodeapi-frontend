import {Field} from './field';

export interface Entity {
  apiKey: string;
  name: string;
  fields: Field[];
}
