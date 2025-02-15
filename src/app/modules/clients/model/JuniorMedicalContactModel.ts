import { MlcModel } from './common/mlc.model';

export class JuniorMedicalContact implements MlcModel {
  name: string;
  typeofpractitioner: string;
  serviceprovided: string;
  locationoraddress: string;
  contactdetails: string;
  notes: string;
}
