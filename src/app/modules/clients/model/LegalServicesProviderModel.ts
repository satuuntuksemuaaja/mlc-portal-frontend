import { MlcModel } from './common/mlc.model';

export class LegalServicesProvider implements MlcModel {
  name: string;
  lawyersname: string;
  lawyerslocationoraddress: string;
  lawyerscontactdetails: string;
  notes: string;
}
