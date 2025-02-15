import { AdvancedDirective } from '../model/AdvancedDirectiveModel';
import { MlcDef } from './common/mlc.def';
import { MlcField } from './common/mlc.field';

export class AdvancedDirectiveDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'adv'];

  public readonly identifier: string = 'AdvancedDirective';

  // Item Name
  public readonly name: string = 'Advanced directive';

  public readonly label: string = 'advanceddirective';

  public readonly classname: any = AdvancedDirective;

  public readonly classifications: string[] = AdvancedDirectiveDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Date', fieldname: 'date', type: 'date', order: 2 },
    { name: 'AuthorisedBy', fieldname: 'authorisedby', type: 'text', order: 3 },
    {
      name: 'LocationOfAdvancedDirective',
      fieldname: 'locationofadvanceddirective',
      type: 'text',
      order: 4
    },
    { name: 'SummaryOfPreferredCare', fieldname: 'summaryofpreferredcare', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): AdvancedDirective {
    return new AdvancedDirective();
  }
}
