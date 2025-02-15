import { Accountant } from '../model/AccountantModel';
import { MlcDef } from './common/mlc.def';
import { MlcField } from './common/mlc.field';

export class AccountantDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'acc'];
  public readonly identifier: string = 'Accountant';

  // Item Name
  public readonly name: string = 'Accountant';

  public readonly label: string = 'accountant';

  public readonly classname: any = Accountant;

  public readonly classifications: string[] = AccountantDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'BusinessName', fieldname: 'businessname', type: 'text', order: 2 },
    {
      name: 'ContactDetail',
      fieldname: 'contactdetail',
      type: 'text',
      order: 3
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Accountant {
    return new Accountant();
  }
}
