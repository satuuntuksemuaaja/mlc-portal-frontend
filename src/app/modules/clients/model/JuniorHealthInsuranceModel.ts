import { MlcModel } from './common/mlc.model';

export class JuniorHealthInsurance implements MlcModel {
  name: string;
  policytypeorcover: string;
  policynumber: string;
  policyexpiryorrenewaldate: string;
  personscovered: string;
  notes: string;
}
