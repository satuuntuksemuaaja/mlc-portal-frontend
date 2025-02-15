import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { FinanceOther } from '../model/FinanceOtherModel';

export class FinanceOtherDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'fot'];

  public readonly identifier: string = 'FinanceOther';

  // Item Name
  public readonly name: string = 'Finance other';

  public readonly label: string = 'financeother';

  public readonly classname: any = FinanceOther;

  public readonly classifications: string[] = FinanceOtherDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): FinanceOther {
    return new FinanceOther();
  }
}
