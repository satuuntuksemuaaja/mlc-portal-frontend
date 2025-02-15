import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorSocial } from '../model/JuniorSocialModel';

export class JuniorSocialDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jac', 'jscl'];

  public readonly identifier: string = 'JuniorSocial';

  // Item Name
  public readonly name: string = 'Junior social';

  public readonly label: string = 'juniorsocial';

  public readonly classname: any = JuniorSocial;

  public readonly classifications: string[] = JuniorSocialDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Type', fieldname: 'type', type: 'text', order: 2 },
    { name: 'Year', fieldname: 'year', type: 'text', order: 3 },
    { name: 'EventType', fieldname: 'eventtype', type: 'text', order: 4 },
    { name: 'SpecialMemories', fieldname: 'specialmemories', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorSocial {
    return new JuniorSocial();
  }
}
