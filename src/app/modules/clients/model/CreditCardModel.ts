import { MlcModel } from './common/mlc.model';

export class CreditCard implements MlcModel {
  name: string;
  bankname: string;
  securitycodeorccv: string;
  creditlimit: string;
  expirydate: string;
  cardrewardscheme: string;
  notes: string;
}
