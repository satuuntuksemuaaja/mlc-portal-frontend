import { MlcModel } from './common/mlc.model';

export class JuniorTestResults implements MlcModel {
  name: string;
  administeredby: string;
  locationoraddress: string;
  results: string;
  furtherinstructions: string;
  notes: string;
}
