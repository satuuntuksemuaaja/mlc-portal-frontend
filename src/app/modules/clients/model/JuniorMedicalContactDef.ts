import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorMedicalContact } from '../model/JuniorMedicalContactModel';

export class JuniorMedicalContactDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jmco'];

  public readonly identifier: string = 'JuniorMedicalContact';

  // Item Name
  public readonly name: string = 'Junior medical contact';

  public readonly label: string = 'juniormedicalcontact';

  public readonly classname: any = JuniorMedicalContact;

  public readonly classifications: string[] = JuniorMedicalContactDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'TypeOfPractitioner', fieldname: 'typeofpractitioner', type: 'text', order: 2 },
    { name: 'ServiceProvided', fieldname: 'serviceprovided', type: 'text', order: 3 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 4 },
    { name: 'ContactDetails', fieldname: 'contactdetails', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorMedicalContact {
    return new JuniorMedicalContact();
  }
}
