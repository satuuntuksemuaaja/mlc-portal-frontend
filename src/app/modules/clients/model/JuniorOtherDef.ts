import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorOther } from '../model/JuniorOtherModel';

export class JuniorOtherDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jhot'];

  public readonly identifier: string = 'JuniorOther';

  // Item Name
  public readonly name: string = 'Junior other';

  public readonly label: string = 'juniorother';

  public readonly classname: any = JuniorOther;

  public readonly classifications: string[] = JuniorOtherDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorOther {
    return new JuniorOther();
  }
}
