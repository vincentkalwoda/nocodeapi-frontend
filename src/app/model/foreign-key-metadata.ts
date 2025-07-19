import {RelationType} from './relation-type';

export interface ForeignKeyMetadata {
  targetEntity: string;
  targetField: string;
  relationType: RelationType;
}
