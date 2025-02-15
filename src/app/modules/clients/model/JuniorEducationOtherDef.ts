import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorEducationOther } from '../model/JuniorEducationOtherModel';

export class JuniorEducationOtherDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jed', 'jeot'];

  public readonly identifier: string = 'JuniorEducationOther';

  // Item Name
  public readonly name: string = 'Junior education other';

  public readonly label: string = 'junioreducationother';

  public readonly classname: any = JuniorEducationOther;

  public readonly classifications: string[] = JuniorEducationOtherDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorEducationOther {
    return new JuniorEducationOther();
  }
}
