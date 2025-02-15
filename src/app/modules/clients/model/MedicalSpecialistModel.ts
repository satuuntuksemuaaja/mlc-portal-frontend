import { MlcModel } from './common/mlc.model';

export class MedicalSpecialist implements MlcModel {
  name: string;
  practicename: string;
  locationoraddress: string;
  phone: string;
  notes: string;
}
