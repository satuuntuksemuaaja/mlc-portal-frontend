import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { ServiceProvider } from '../model/ServiceProviderModel';

export class ServiceProviderDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'spr'];

  public readonly identifier: string = 'ServiceProvider';

  // Item Name
  public readonly name: string = 'Service provider';

  public readonly label: string = 'serviceprovider';

  public readonly classname: any = ServiceProvider;

  public readonly classifications: string[] = ServiceProviderDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    {
      name: 'ServiceProviderLocationOrAddress',
      fieldname: 'serviceproviderlocationoraddress',
      type: 'text',
      order: 2
    },
    { name: 'WarrantyPeriod', fieldname: 'warrantyperiod', type: 'text', order: 3 },
    { name: 'DateOfLastService', fieldname: 'dateoflastservice', type: 'date', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): ServiceProvider {
    return new ServiceProvider();
  }
}
