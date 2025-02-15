import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorSocialMedia } from '../model/JuniorSocialMediaModel';

export class JuniorSocialMediaDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jpw', 'jscm'];

  public readonly identifier: string = 'JuniorSocialMedia';

  // Item Name
  public readonly name: string = 'Junior social media';

  public readonly label: string = 'juniorsocialmedia';

  public readonly classname: any = JuniorSocialMedia;

  public readonly classifications: string[] = JuniorSocialMediaDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorSocialMedia {
    return new JuniorSocialMedia();
  }
}
