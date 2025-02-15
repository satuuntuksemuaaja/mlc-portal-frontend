import { MlcModel } from './common/mlc.model';

export class BloodType implements MlcModel {
  name: string;
  bloodtype: string;
  knownbloodhealthissues: string;
  notes: string;
}
