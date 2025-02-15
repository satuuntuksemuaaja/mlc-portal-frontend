import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { BudgetOrForecast } from '../model/BudgetOrForecastModel';

export class BudgetOrForecastDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'bud'];

  public readonly identifier: string = 'BudgetOrForecast';

  // Item Name
  public readonly name: string = 'Budget or forecast';

  public readonly label: string = 'budgetorforecast';

  public readonly classname: any = BudgetOrForecast;

  public readonly classifications: string[] = BudgetOrForecastDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Type', fieldname: 'type', type: 'text', order: 2 },
    { name: 'Year', fieldname: 'year', type: 'text', order: 3 },
    { name: 'Goal', fieldname: 'goal', type: 'text', order: 4 },
    { name: 'Result', fieldname: 'result', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): BudgetOrForecast {
    return new BudgetOrForecast();
  }
}
