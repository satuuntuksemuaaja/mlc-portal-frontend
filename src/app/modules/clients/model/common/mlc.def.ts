import { MlcField } from './mlc.field';

/**
 * A definition is a simplified template.
 */
export interface MlcDef {
  /** Unique identifier name (machine name) */
  identifier: string;

  // Human Readable Name
  name: string;

  /** meeco label */
  label: string;

  /** Meeco classifications */
  classifications: string[];

  /** The field types that make up this data item */
  fields: MlcField[];

  /**
   * The class constructor reference to create a model
   */
  classname: any;

  /**
   * @returns an empty model - based on @see MlcDef.classname
   */
  newModel(): any;
}
