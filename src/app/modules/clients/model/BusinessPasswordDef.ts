import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { BusinessPassword } from '../model/BusinessPasswordModel';

export class BusinessPasswordDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'pw', 'bns'];

  public readonly identifier: string = 'BusinessPassword';

  // Item Name
  public readonly name: string = 'Business password';

  public readonly label: string = 'businesspassword';

  public readonly classname: any = BusinessPassword;

  public readonly classifications: string[] = BusinessPasswordDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): BusinessPassword {
    return new BusinessPassword();
  }
}
