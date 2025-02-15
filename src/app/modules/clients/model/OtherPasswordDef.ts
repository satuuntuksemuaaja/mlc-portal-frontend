import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { OtherPassword } from '../model/OtherPasswordModel';

export class OtherPasswordDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'pw', 'otp'];

  public readonly identifier: string = 'OtherPassword';

  // Item Name
  public readonly name: string = 'Other password';

  public readonly label: string = 'otherpassword';

  public readonly classname: any = OtherPassword;

  public readonly classifications: string[] = OtherPasswordDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): OtherPassword {
    return new OtherPassword();
  }
}
