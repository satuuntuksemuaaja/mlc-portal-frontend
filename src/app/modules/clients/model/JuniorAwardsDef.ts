import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorAwards } from '../model/JuniorAwardsModel';

export class JuniorAwardsDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jed', 'jawd'];

  public readonly identifier: string = 'JuniorAwards';

  // Item Name
  public readonly name: string = 'Junior awards';

  public readonly label: string = 'juniorawards';

  public readonly classname: any = JuniorAwards;

  public readonly classifications: string[] = JuniorAwardsDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Year', fieldname: 'year', type: 'text', order: 2 },
    { name: 'Term', fieldname: 'term', type: 'text', order: 3 },
    { name: 'AwardedFor', fieldname: 'awardedfor', type: 'text', order: 4 },
    { name: 'NewGoals', fieldname: 'newgoals', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorAwards {
    return new JuniorAwards();
  }
}
