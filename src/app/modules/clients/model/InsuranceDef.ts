import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Insurance } from '../model/InsuranceModel';

export class InsuranceDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'ins'];

  public readonly identifier: string = 'Insurance';

  // Item Name
  public readonly name: string = 'Insurance';

  public readonly label: string = 'insurance';

  public readonly classname: any = Insurance;

  public readonly classifications: string[] = InsuranceDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'PolicyTypeOrCover', fieldname: 'policytypeorcover', type: 'text', order: 2 },
    { name: 'PolicyNumber', fieldname: 'policynumber', type: 'text', order: 3 },
    {
      name: 'PolicyExpiryOrRenewalDate',
      fieldname: 'policyexpiryorrenewaldate',
      type: 'date',
      order: 4
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Insurance {
    return new Insurance();
  }
}
