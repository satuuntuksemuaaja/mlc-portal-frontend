import { MlcModel } from './common/mlc.model';

export class BudgetOrForecast implements MlcModel {
  name: string;
  type: string;
  year: string;
  goal: string;
  result: string;
  notes: string;
}
