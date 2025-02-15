import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Email } from '../model/EmailModel';

export class EmailDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'pw', 'eml'];

  public readonly identifier: string = 'Email';

  // Item Name
  public readonly name: string = 'Email';

  public readonly label: string = 'email';

  public readonly classname: any = Email;

  public readonly classifications: string[] = EmailDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Email {
    return new Email();
  }
}
