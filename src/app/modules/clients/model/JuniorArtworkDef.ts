import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorArtwork } from '../model/JuniorArtworkModel';

export class JuniorArtworkDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jac', 'jart'];

  public readonly identifier: string = 'JuniorArtwork';

  // Item Name
  public readonly name: string = 'Junior artwork';

  public readonly label: string = 'juniorartwork';

  public readonly classname: any = JuniorArtwork;

  public readonly classifications: string[] = JuniorArtworkDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Year', fieldname: 'year', type: 'text', order: 2 },
    { name: 'Class', fieldname: 'class', type: 'text', order: 3 },
    { name: 'Teacher', fieldname: 'teacher', type: 'text', order: 4 },
    { name: 'Type', fieldname: 'type', type: 'text', order: 5 },
    { name: 'SpecialMemories', fieldname: 'specialmemories', type: 'text', order: 6 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorArtwork {
    return new JuniorArtwork();
  }
}
