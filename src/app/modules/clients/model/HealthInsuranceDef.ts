import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { HealthInsurance } from '../model/HealthInsuranceModel';

export class HealthInsuranceDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'hip'];

  public readonly identifier: string = 'HealthInsurance';

  // Item Name
  public readonly name: string = 'Health insurance';

  public readonly label: string = 'healthinsurance';

  public readonly classname: any = HealthInsurance;

  public readonly classifications: string[] = HealthInsuranceDef.defclassifications;

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
    { name: 'PersonsCovered', fieldname: 'personscovered', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): HealthInsurance {
    return new HealthInsurance();
  }
}
