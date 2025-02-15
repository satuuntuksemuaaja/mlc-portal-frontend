import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Other } from '../model/OtherModel';

export class OtherDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'hot'];

  public readonly identifier: string = 'Other';

  // Item Name
  public readonly name: string = 'Other';

  public readonly label: string = 'other';

  public readonly classname: any = Other;

  public readonly classifications: string[] = OtherDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Other {
    return new Other();
  }
}
