import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { MusicService } from '../model/MusicServiceModel';

export class MusicServiceDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'pw', 'mus'];

  public readonly identifier: string = 'MusicService';

  // Item Name
  public readonly name: string = 'Music service';

  public readonly label: string = 'musicservice';

  public readonly classname: any = MusicService;

  public readonly classifications: string[] = MusicServiceDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): MusicService {
    return new MusicService();
  }
}
