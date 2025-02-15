import { MlcModel } from './common/mlc.model';

export class JuniorProcedureOrOperation implements MlcModel {
  name: string;
  dateofprocedure: string;
  procedureperformedby: string;
  resultsofprocedure: string;
  furtherinstructions: string;
  notes: string;
}
