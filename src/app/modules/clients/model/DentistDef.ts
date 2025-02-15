import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Dentist } from '../model/DentistModel';

export class DentistDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'den'];

  public readonly identifier: string = 'Dentist';

  // Item Name
  public readonly name: string = 'Dentist';

  public readonly label: string = 'dentist';

  public readonly classname: any = Dentist;

  public readonly classifications: string[] = DentistDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'PracticeName', fieldname: 'practicename', type: 'text', order: 2 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 3 },
    { name: 'Phone', fieldname: 'phone', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Dentist {
    return new Dentist();
  }
}
