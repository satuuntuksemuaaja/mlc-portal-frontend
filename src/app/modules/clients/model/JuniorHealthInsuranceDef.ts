import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorHealthInsurance } from '../model/JuniorHealthInsuranceModel';

export class JuniorHealthInsuranceDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jhip'];

  public readonly identifier: string = 'JuniorHealthInsurance';

  // Item Name
  public readonly name: string = 'Junior health insurance';

  public readonly label: string = 'juniorhealthinsurance';

  public readonly classname: any = JuniorHealthInsurance;

  public readonly classifications: string[] = JuniorHealthInsuranceDef.defclassifications;

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

  newModel(): JuniorHealthInsurance {
    return new JuniorHealthInsurance();
  }
}
