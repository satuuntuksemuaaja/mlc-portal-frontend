import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { PreferredHospital } from '../model/PreferredHospitalModel';

export class PreferredHospitalDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'hsp'];

  public readonly identifier: string = 'PreferredHospital';

  // Item Name
  public readonly name: string = 'Preferred hospital';

  public readonly label: string = 'preferredhospital';

  public readonly classname: any = PreferredHospital;

  public readonly classifications: string[] = PreferredHospitalDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 2 },
    { name: 'Phone', fieldname: 'phone', type: 'text', order: 3 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): PreferredHospital {
    return new PreferredHospital();
  }
}
