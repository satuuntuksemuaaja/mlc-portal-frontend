import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorBloodType } from '../model/JuniorBloodTypeModel';

export class JuniorBloodTypeDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jbld'];

  public readonly identifier: string = 'JuniorBloodType';

  // Item Name
  public readonly name: string = 'Junior blood type';

  public readonly label: string = 'juniorbloodtype';

  public readonly classname: any = JuniorBloodType;

  public readonly classifications: string[] = JuniorBloodTypeDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'BloodType', fieldname: 'bloodtype', type: 'text', order: 2 },
    { name: 'KnownBloodHealthIssues', fieldname: 'knownbloodhealthissues', type: 'text', order: 3 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorBloodType {
    return new JuniorBloodType();
  }
}
