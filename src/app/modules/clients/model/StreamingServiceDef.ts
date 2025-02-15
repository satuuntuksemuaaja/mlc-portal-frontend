import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { StreamingService } from '../model/StreamingServiceModel';

export class StreamingServiceDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'pw', 'sts'];

  public readonly identifier: string = 'StreamingService';

  // Item Name
  public readonly name: string = 'Streaming service';

  public readonly label: string = 'streamingservice';

  public readonly classname: any = StreamingService;

  public readonly classifications: string[] = StreamingServiceDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): StreamingService {
    return new StreamingService();
  }
}
