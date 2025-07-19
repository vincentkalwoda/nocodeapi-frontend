import {ConstraintType} from './constraint-type';
import {ForeignKeyMetadata} from './foreign-key-metadata';

export interface Constraint {
  constraintType: ConstraintType;
  value: string;
  foreignKeyMetadata?: ForeignKeyMetadata;
}
