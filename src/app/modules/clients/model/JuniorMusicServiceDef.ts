import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorMusicService } from '../model/JuniorMusicServiceModel';

export class JuniorMusicServiceDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jpw', 'jmus'];

  public readonly identifier: string = 'JuniorMusicService';

  // Item Name
  public readonly name: string = 'Junior music service';

  public readonly label: string = 'juniormusicservice';

  public readonly classname: any = JuniorMusicService;

  public readonly classifications: string[] = JuniorMusicServiceDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorMusicService {
    return new JuniorMusicService();
  }
}
