import { MlcModel } from './common/mlc.model';

export class Dentist implements MlcModel {
  name: string;
  practicename: string;
  locationoraddress: string;
  phone: string;
  notes: string;
}
