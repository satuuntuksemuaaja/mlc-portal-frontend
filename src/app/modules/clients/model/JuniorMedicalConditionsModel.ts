import { MlcModel } from './common/mlc.model';

export class JuniorMedicalConditions implements MlcModel {
  name: string;
  nameofmedication: string;
  type: string;
  prescribedby: string;
  dateofprescription: string;
  prescriptionexpirydate: string;
  numberofrepeats: string;
  dose: string;
  frequency: string;
  additionalinstructions: string;
  notes: string;
}
