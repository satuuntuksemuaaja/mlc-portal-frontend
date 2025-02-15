import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { GamingService } from '../model/GamingServiceModel';

export class GamingServiceDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'pw', 'gam'];

  public readonly identifier: string = 'GamingService';

  // Item Name
  public readonly name: string = 'Gaming service';

  public readonly label: string = 'gamingservice';

  public readonly classname: any = GamingService;

  public readonly classifications: string[] = GamingServiceDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): GamingService {
    return new GamingService();
  }
}
