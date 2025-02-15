import { MlcModel } from './common/mlc.model';

export class JuniorSchoolReport implements MlcModel {
  name: string;
  school: string;
  year: string;
  resultsummary: string;
  newgoals: string;
  notes: string;
}
