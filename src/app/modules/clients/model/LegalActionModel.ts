import { MlcModel } from './common/mlc.model';

export class LegalAction implements MlcModel {
  name: string;
  nameorcasedescription: string;
  locationoflegaldocumentation: string;
  nameoflegalrepresentative: string;
  notes: string;
}
