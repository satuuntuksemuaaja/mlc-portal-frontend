import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { LegalOther } from '../model/LegalOtherModel';

export class LegalOtherDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'lg', 'lot'];

  public readonly identifier: string = 'LegalOther';

  // Item Name
  public readonly name: string = 'Legal other';

  public readonly label: string = 'legalother';

  public readonly classname: any = LegalOther;

  public readonly classifications: string[] = LegalOtherDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): LegalOther {
    return new LegalOther();
  }
}
