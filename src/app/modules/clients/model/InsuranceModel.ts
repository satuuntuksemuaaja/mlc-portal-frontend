import { MlcModel } from './common/mlc.model';

export class Insurance implements MlcModel {
  name: string;
  policytypeorcover: string;
  policynumber: string;
  policyexpiryorrenewaldate: string;
  notes: string;
}
