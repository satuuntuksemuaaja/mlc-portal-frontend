import { MlcModel } from './common/mlc.model';

export class BankAccountBankCardOrLoan implements MlcModel {
  name: string;
  branchnameorlocation: string;
  accountorloanname: string;
  accounttype: string;
  bsborswift: string;
  accountorcardnumber: string;
  securitycodeccv: string;
  creditlimit: string;
  cardrewardscheme: string;
  customerorloannumber: string;
  accountsignatories: string;
  accountexpiryorrenewaldate: string;
  notes: string;
}
