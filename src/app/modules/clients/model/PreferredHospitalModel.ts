import { MlcModel } from './common/mlc.model';

export class PreferredHospital implements MlcModel {
  name: string;
  locationoraddress: string;
  phone: string;
  notes: string;
}
