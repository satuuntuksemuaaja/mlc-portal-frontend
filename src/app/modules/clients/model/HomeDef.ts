import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Home } from '../model/HomeModel';

export class HomeDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'pw', 'hom'];

  public readonly identifier: string = 'Home';

  // Item Name
  public readonly name: string = 'Home';

  public readonly label: string = 'home';

  public readonly classname: any = Home;

  public readonly classifications: string[] = HomeDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Home {
    return new Home();
  }
}
