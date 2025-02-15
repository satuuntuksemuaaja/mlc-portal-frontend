import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorEmail } from '../model/JuniorEmailModel';

export class JuniorEmailDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jpw', 'jeml'];

  public readonly identifier: string = 'JuniorEmail';

  // Item Name
  public readonly name: string = 'Junior email';

  public readonly label: string = 'junioremail';

  public readonly classname: any = JuniorEmail;

  public readonly classifications: string[] = JuniorEmailDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorEmail {
    return new JuniorEmail();
  }
}
