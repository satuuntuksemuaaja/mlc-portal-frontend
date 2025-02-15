import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { SocialMedia } from '../model/SocialMediaModel';

export class SocialMediaDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'pw', 'scm'];

  public readonly identifier: string = 'SocialMedia';

  // Item Name
  public readonly name: string = 'Social media';

  public readonly label: string = 'socialmedia';

  public readonly classname: any = SocialMedia;

  public readonly classifications: string[] = SocialMediaDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Username', fieldname: 'username', type: 'text', order: 2 },
    { name: 'Password', fieldname: 'password', type: 'text', order: 3 },
    { name: 'WebsiteAddress', fieldname: 'websiteaddress', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): SocialMedia {
    return new SocialMedia();
  }
}
