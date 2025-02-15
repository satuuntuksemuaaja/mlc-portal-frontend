import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { VehiclePassword } from '../model/VehiclePasswordModel';

export class VehiclePasswordDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'pw', 'vhc'];

  public readonly identifier: string = 'VehiclePassword';

  // Item Name
  public readonly name: string = 'Vehicle password';

  public readonly label: string = 'vehiclepassword';

  public readonly classname: any = VehiclePassword;

  public readonly classifications: string[] = VehiclePasswordDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): VehiclePassword {
    return new VehiclePassword();
  }
}
