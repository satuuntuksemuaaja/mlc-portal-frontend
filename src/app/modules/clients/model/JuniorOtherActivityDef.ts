import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorOtherActivity } from '../model/JuniorOtherActivityModel';

export class JuniorOtherActivityDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jac', 'jaot'];

  public readonly identifier: string = 'JuniorOtherActivity';

  // Item Name
  public readonly name: string = 'Junior other activity';

  public readonly label: string = 'juniorotheractivity';

  public readonly classname: any = JuniorOtherActivity;

  public readonly classifications: string[] = JuniorOtherActivityDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorOtherActivity {
    return new JuniorOtherActivity();
  }
}
