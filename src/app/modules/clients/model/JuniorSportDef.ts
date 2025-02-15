import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorSport } from '../model/JuniorSportModel';

export class JuniorSportDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jac', 'jspt'];

  public readonly identifier: string = 'JuniorSport';

  // Item Name
  public readonly name: string = 'Junior sport';

  public readonly label: string = 'juniorsport';

  public readonly classname: any = JuniorSport;

  public readonly classifications: string[] = JuniorSportDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Type', fieldname: 'type', type: 'text', order: 2 },
    { name: 'Year', fieldname: 'year', type: 'text', order: 3 },
    { name: 'Team', fieldname: 'team', type: 'text', order: 4 },
    { name: 'Coach', fieldname: 'coach', type: 'text', order: 5 },
    { name: 'SpecialMemories', fieldname: 'specialmemories', type: 'text', order: 6 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorSport {
    return new JuniorSport();
  }
}
