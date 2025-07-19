import {Constraint} from './constraint';
import {FieldType} from './field-type';

export interface Field {
  apiKey: string;
  name: string;
  type: FieldType;
  constraints: Constraint[];
}
