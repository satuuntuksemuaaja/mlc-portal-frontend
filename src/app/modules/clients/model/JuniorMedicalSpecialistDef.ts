import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorMedicalSpecialist } from '../model/JuniorMedicalSpecialistModel';

export class JuniorMedicalSpecialistDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jspe'];

  public readonly identifier: string = 'JuniorMedicalSpecialist';

  // Item Name
  public readonly name: string = 'Junior medical specialist';

  public readonly label: string = 'juniormedicalspecialist';

  public readonly classname: any = JuniorMedicalSpecialist;

  public readonly classifications: string[] = JuniorMedicalSpecialistDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'PracticeName', fieldname: 'practicename', type: 'text', order: 2 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 3 },
    { name: 'Phone', fieldname: 'phone', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorMedicalSpecialist {
    return new JuniorMedicalSpecialist();
  }
}
