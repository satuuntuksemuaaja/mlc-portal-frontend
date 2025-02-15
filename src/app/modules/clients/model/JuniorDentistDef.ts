import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorDentist } from '../model/JuniorDentistModel';

export class JuniorDentistDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jden'];

  public readonly identifier: string = 'JuniorDentist';

  // Item Name
  public readonly name: string = 'Junior dentist';

  public readonly label: string = 'juniordentist';

  public readonly classname: any = JuniorDentist;

  public readonly classifications: string[] = JuniorDentistDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'PracticeName', fieldname: 'practicename', type: 'text', order: 2 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 3 },
    { name: 'Phone', fieldname: 'phone', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorDentist {
    return new JuniorDentist();
  }
}
