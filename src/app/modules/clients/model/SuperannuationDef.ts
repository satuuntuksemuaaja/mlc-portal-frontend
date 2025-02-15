import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Superannuation } from '../model/SuperannuationModel';

export class SuperannuationDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'spr'];

  public readonly identifier: string = 'Superannuation';

  // Item Name
  public readonly name: string = 'Superannuation';

  public readonly label: string = 'superannuation';

  public readonly classname: any = Superannuation;

  public readonly classifications: string[] = SuperannuationDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'PolicyType', fieldname: 'policytype', type: 'text', order: 2 },
    { name: 'PolicyNumber', fieldname: 'policynumber', type: 'text', order: 3 },
    {
      name: 'PolicyExpiryOrRenewalDate',
      fieldname: 'policyexpiryorrenewaldate',
      type: 'date',
      order: 4
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Superannuation {
    return new Superannuation();
  }
}
