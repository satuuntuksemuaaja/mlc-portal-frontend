import { MlcModel } from './common/mlc.model';

export class JuniorAllergiesOrIntolerances implements MlcModel {
  name: string;
  effectofallergy: string;
  nameofmedicationortreatment: string;
  typeofmedicationortreatment: string;
  prescribedby: string;
  dateofprescription: string;
  prescriptionexpirydate: string;
  numberofrepeats: string;
  dose: string;
  frequency: string;
  additionalinstructions: string;
  notes: string;
}
