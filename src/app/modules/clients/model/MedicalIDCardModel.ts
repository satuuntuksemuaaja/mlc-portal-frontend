import { MlcModel } from './common/mlc.model';

export class MedicalIDCard implements MlcModel {
  name: string;
  cardnumbers: string;
  otherslisted: string;
  notes: string;
}
