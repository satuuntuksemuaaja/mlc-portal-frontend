import { MlcModel } from './common/mlc.model';

export class HomeInsurance implements MlcModel {
  name: string;
  policytypeorcover: string;
  policynumber: string;
  policyexpiryorrenewaldate: string;
  notes: string;
}
