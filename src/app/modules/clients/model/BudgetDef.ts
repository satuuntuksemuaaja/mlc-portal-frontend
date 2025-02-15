import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Budget } from '../model/BudgetModel';

export class BudgetDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'bdg'];

  public readonly identifier: string = 'Budget';

  // Item Name
  public readonly name: string = 'Budget';

  public readonly label: string = 'budget';

  public readonly classname: any = Budget;

  public readonly classifications: string[] = BudgetDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Type', fieldname: 'type', type: 'text', order: 2 },
    { name: 'Year', fieldname: 'year', type: 'text', order: 3 },
    { name: 'Goal', fieldname: 'goal', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Budget {
    return new Budget();
  }
}
