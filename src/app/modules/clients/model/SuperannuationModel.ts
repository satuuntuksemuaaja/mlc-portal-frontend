import { MlcModel } from './common/mlc.model';

export class Superannuation implements MlcModel {
  name: string;
  policytype: string;
  policynumber: string;
  policyexpiryorrenewaldate: string;
  notes: string;
}
