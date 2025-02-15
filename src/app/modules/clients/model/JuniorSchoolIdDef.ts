import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorSchoolId } from '../model/JuniorSchoolIdModel';

export class JuniorSchoolIdDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jpw', 'jsid'];

  public readonly identifier: string = 'JuniorSchoolId';

  // Item Name
  public readonly name: string = 'Junior school ID';

  public readonly label: string = 'juniorschoolid';

  public readonly classname: any = JuniorSchoolId;

  public readonly classifications: string[] = JuniorSchoolIdDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorSchoolId {
    return new JuniorSchoolId();
  }
}
