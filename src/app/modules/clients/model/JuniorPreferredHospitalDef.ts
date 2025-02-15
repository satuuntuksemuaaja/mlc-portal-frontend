import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorPreferredHospital } from '../model/JuniorPreferredHospitalModel';

export class JuniorPreferredHospitalDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jhsp'];

  public readonly identifier: string = 'JuniorPreferredHospital';

  // Item Name
  public readonly name: string = 'Junior preferred hospital';

  public readonly label: string = 'juniorpreferredhospital';

  public readonly classname: any = JuniorPreferredHospital;

  public readonly classifications: string[] = JuniorPreferredHospitalDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 2 },
    { name: 'Phone', fieldname: 'phone', type: 'text', order: 3 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorPreferredHospital {
    return new JuniorPreferredHospital();
  }
}
