import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorOtherPassword } from '../model/JuniorOtherPasswordModel';

export class JuniorOtherPasswordDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jpw', 'jotp'];

  public readonly identifier: string = 'JuniorOtherPassword';

  // Item Name
  public readonly name: string = 'Junior other password';

  public readonly label: string = 'juniorotherpassword';

  public readonly classname: any = JuniorOtherPassword;

  public readonly classifications: string[] = JuniorOtherPasswordDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorOtherPassword {
    return new JuniorOtherPassword();
  }
}
