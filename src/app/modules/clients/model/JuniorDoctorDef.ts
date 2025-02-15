import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorDoctor } from '../model/JuniorDoctorModel';

export class JuniorDoctorDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jdoc'];

  public readonly identifier: string = 'JuniorDoctor';

  // Item Name
  public readonly name: string = 'Junior doctor';

  public readonly label: string = 'juniordoctor';

  public readonly classname: any = JuniorDoctor;

  public readonly classifications: string[] = JuniorDoctorDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'PracticeName', fieldname: 'practicename', type: 'text', order: 2 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 3 },
    { name: 'Phone', fieldname: 'phone', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorDoctor {
    return new JuniorDoctor();
  }
}
