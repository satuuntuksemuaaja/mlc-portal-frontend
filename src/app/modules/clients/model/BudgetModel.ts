import { MlcModel } from './common/mlc.model';

export class Budget implements MlcModel {
  name: string;
  type: string;
  year: string;
  goal: string;
  notes: string;
}
