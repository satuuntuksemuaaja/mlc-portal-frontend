import { MlcModel } from './common/mlc.model';

export class IllnessOrInjury implements MlcModel {
  name: string;
  nameofinjuryorillness: string;
  effectonhealthorwellbeing: string;
  medicationortreatment: string;
  notes: string;
}
