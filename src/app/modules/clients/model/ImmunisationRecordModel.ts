import { MlcModel } from './common/mlc.model';

export class ImmunisationRecord implements MlcModel {
  name: string;
  administeredby: string;
  locationoraddress: string;
  results: string;
  furtherinstructions: string;
  notes: string;
}
