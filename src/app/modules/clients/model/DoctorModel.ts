import { MlcModel } from './common/mlc.model';

export class Doctor implements MlcModel {
  name: string;
  practicename: string;
  locationoraddress: string;
  phone: string;
  notes: string;
}
