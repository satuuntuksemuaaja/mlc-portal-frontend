import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { VehicleInsurance } from '../model/VehicleInsuranceModel';

export class VehicleInsuranceDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'ine'];

  public readonly identifier: string = 'VehicleInsurance';

  // Item Name
  public readonly name: string = 'Vehicle insurance';

  public readonly label: string = 'vehicleinsurance';

  public readonly classname: any = VehicleInsurance;

  public readonly classifications: string[] = VehicleInsuranceDef.defclassifications;

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

  newModel(): VehicleInsurance {
    return new VehicleInsurance();
  }
}
