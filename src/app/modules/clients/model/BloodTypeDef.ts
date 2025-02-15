import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { BloodType } from '../model/BloodTypeModel';

export class BloodTypeDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'bld'];

  public readonly identifier: string = 'BloodType';

  // Item Name
  public readonly name: string = 'Blood type';

  public readonly label: string = 'bloodtype';

  public readonly classname: any = BloodType;

  public readonly classifications: string[] = BloodTypeDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'BloodType', fieldname: 'bloodtype', type: 'text', order: 2 },
    { name: 'KnownBloodHealthIssues', fieldname: 'knownbloodhealthissues', type: 'text', order: 3 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): BloodType {
    return new BloodType();
  }
}
