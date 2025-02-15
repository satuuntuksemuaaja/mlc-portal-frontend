import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { HomeInsurance } from '../model/HomeInsuranceModel';

export class HomeInsuranceDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'hin'];

  public readonly identifier: string = 'HomeInsurance';

  // Item Name
  public readonly name: string = 'Home insurance';

  public readonly label: string = 'homeinsurance';

  public readonly classname: any = HomeInsurance;

  public readonly classifications: string[] = HomeInsuranceDef.defclassifications;

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

  newModel(): HomeInsurance {
    return new HomeInsurance();
  }
}
