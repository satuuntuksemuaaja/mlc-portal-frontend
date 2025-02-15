import { MlcModel } from './common/mlc.model';

export class BankAccount implements MlcModel {
  name: string;
  bankorinstitutionname: string;
  branchnameorlocation: string;
  accountorloanname: string;
  accounttype: string;
  bsborswift: string;
  accountorcardnumber: string;
  securitycodeorccv: string;
  creditlimit: string;
  accountsignatories: string;
  notes: string;
}
