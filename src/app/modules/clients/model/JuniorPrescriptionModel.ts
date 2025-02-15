import { MlcModel } from './common/mlc.model';

export class JuniorPrescription implements MlcModel {
  name: string;
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
