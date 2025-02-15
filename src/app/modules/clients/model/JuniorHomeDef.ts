import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorHome } from '../model/JuniorHomeModel';

export class JuniorHomeDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jpw', 'jhom'];

  public readonly identifier: string = 'JuniorHome';

  // Item Name
  public readonly name: string = 'Junior home';

  public readonly label: string = 'juniorhome';

  public readonly classname: any = JuniorHome;

  public readonly classifications: string[] = JuniorHomeDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorHome {
    return new JuniorHome();
  }
}
