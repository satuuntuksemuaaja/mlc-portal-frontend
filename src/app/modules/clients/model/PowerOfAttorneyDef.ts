import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { PowerOfAttorney } from '../model/PowerOfAttorneyModel';

export class PowerOfAttorneyDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'lg', 'poa'];

  public readonly identifier: string = 'PowerOfAttorney';

  // Item Name
  public readonly name: string = 'Power of attorney';

  public readonly label: string = 'powerofattorney';

  public readonly classname: any = PowerOfAttorney;

  public readonly classifications: string[] = PowerOfAttorneyDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'NameOfPowerOfAttorney', fieldname: 'nameofpowerofattorney', type: 'text', order: 2 },
    { name: 'DateOfExecution', fieldname: 'dateofexecution', type: 'date', order: 3 },
    {
      name: 'ContactDetailsOfPowerOfAttorney',
      fieldname: 'contactdetailsofpowerofattorney',
      type: 'text',
      order: 4
    },
    {
      name: 'LegalRepresentativeOrProvider',
      fieldname: 'legalrepresentativeorprovider',
      type: 'text',
      order: 5
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): PowerOfAttorney {
    return new PowerOfAttorney();
  }
}
