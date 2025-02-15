import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { UtilityService } from '../model/UtilityServiceModel';

export class UtilityServiceDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'uts'];

  public readonly identifier: string = 'UtilityService';

  // Item Name
  public readonly name: string = 'Utility service';

  public readonly label: string = 'utilityservice';

  public readonly classname: any = UtilityService;

  public readonly classifications: string[] = UtilityServiceDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'ProviderService', fieldname: 'providerservice', type: 'text', order: 2 },
    { name: 'ProviderContact', fieldname: 'providercontact', type: 'text', order: 3 },
    { name: 'AccountNumber', fieldname: 'accountnumber', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): UtilityService {
    return new UtilityService();
  }
}
