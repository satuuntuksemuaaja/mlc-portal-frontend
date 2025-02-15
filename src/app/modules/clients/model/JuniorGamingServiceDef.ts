import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorGamingService } from '../model/JuniorGamingServiceModel';

export class JuniorGamingServiceDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jpw', 'jgam'];

  public readonly identifier: string = 'JuniorGamingService';

  // Item Name
  public readonly name: string = 'Junior gaming service';

  public readonly label: string = 'juniorgamingservice';

  public readonly classname: any = JuniorGamingService;

  public readonly classifications: string[] = JuniorGamingServiceDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorGamingService {
    return new JuniorGamingService();
  }
}
