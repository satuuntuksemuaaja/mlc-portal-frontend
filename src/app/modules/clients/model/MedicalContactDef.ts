import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { MedicalContact } from '../model/MedicalContactModel';

export class MedicalContactDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'mco'];

  public readonly identifier: string = 'MedicalContact';

  // Item Name
  public readonly name: string = 'Medical contact';

  public readonly label: string = 'medicalcontact';

  public readonly classname: any = MedicalContact;

  public readonly classifications: string[] = MedicalContactDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'TypeOfPractitioner', fieldname: 'typeofpractitioner', type: 'text', order: 2 },
    { name: 'ServiceProvided', fieldname: 'serviceprovided', type: 'text', order: 3 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 4 },
    { name: 'ContactDetails', fieldname: 'contactdetails', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): MedicalContact {
    return new MedicalContact();
  }
}
