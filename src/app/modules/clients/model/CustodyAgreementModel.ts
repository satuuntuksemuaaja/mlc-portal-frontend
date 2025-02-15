import { MlcModel } from './common/mlc.model';

export class CustodyAgreement implements MlcModel {
  name: string;
  fullnameofcustodianonagreementorcertification: string;
  fullnameofchildpersonincustody: string;
  additionalinformation: string;
  notes: string;
}
