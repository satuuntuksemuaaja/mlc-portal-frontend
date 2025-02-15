import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorStreamingService } from '../model/JuniorStreamingServiceModel';

export class JuniorStreamingServiceDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jpw', 'jsts'];

  public readonly identifier: string = 'JuniorStreamingService';

  // Item Name
  public readonly name: string = 'Junior streaming service';

  public readonly label: string = 'juniorstreamingservice';

  public readonly classname: any = JuniorStreamingService;

  public readonly classifications: string[] = JuniorStreamingServiceDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorStreamingService {
    return new JuniorStreamingService();
  }
}
