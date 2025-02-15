import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Will } from '../model/WillModel';

export class WillDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'lg', 'wil'];

  public readonly identifier: string = 'Will';

  // Item Name
  public readonly name: string = 'Will';

  public readonly label: string = 'will';

  public readonly classname: any = Will;

  public readonly classifications: string[] = WillDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'FullNameOnLegalWill', fieldname: 'fullnameonlegalwill', type: 'text', order: 2 },
    { name: 'DateOfExecution', fieldname: 'dateofexecution', type: 'date', order: 3 },
    { name: 'LocationOfLegalWill', fieldname: 'locationoflegalwill', type: 'text', order: 4 },
    {
      name: 'NameOfExecutorOfLegalWill',
      fieldname: 'nameofexecutoroflegalwill',
      type: 'text',
      order: 5
    },
    {
      name: 'ContactDetailsOfExecutor',
      fieldname: 'contactdetailsofexecutor',
      type: 'text',
      order: 6
    },
    {
      name: 'LegalRepresentativeOrProvider',
      fieldname: 'legalrepresentativeorprovider',
      type: 'text',
      order: 7
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Will {
    return new Will();
  }
}
