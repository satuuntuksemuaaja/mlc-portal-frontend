import { MlcModel } from './common/mlc.model';

export class JuniorBloodType implements MlcModel {
  name: string;
  bloodtype: string;
  knownbloodhealthissues: string;
  notes: string;
}
