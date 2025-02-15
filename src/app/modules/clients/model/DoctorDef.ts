import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Doctor } from '../model/DoctorModel';

export class DoctorDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'doc'];

  public readonly identifier: string = 'Doctor';

  // Item Name
  public readonly name: string = 'Doctor';

  public readonly label: string = 'doctor';

  public readonly classname: any = Doctor;

  public readonly classifications: string[] = DoctorDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'PracticeName', fieldname: 'practicename', type: 'text', order: 2 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 3 },
    { name: 'Phone', fieldname: 'phone', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Doctor {
    return new Doctor();
  }
}
