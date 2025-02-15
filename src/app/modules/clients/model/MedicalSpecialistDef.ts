import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { MedicalSpecialist } from '../model/MedicalSpecialistModel';

export class MedicalSpecialistDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'spe'];

  public readonly identifier: string = 'MedicalSpecialist';

  // Item Name
  public readonly name: string = 'Medical specialist';

  public readonly label: string = 'medicalspecialist';

  public readonly classname: any = MedicalSpecialist;

  public readonly classifications: string[] = MedicalSpecialistDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'PracticeName', fieldname: 'practicename', type: 'text', order: 2 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 3 },
    { name: 'Phone', fieldname: 'phone', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): MedicalSpecialist {
    return new MedicalSpecialist();
  }
}
