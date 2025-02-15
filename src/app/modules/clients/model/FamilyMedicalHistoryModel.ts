import { MlcModel } from './common/mlc.model';

export class FamilyMedicalHistory implements MlcModel {
  name: string;
  personsaffected: string;
  lineageorsideoffamily: string;
  affectoroutcome: string;
  notes: string;
}
