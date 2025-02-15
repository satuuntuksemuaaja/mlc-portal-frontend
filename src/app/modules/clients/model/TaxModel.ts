import { MlcModel } from './common/mlc.model';

export class Tax implements MlcModel {
  name: string;
  taxtype: string;
  taxname: string;
  taxaccountantname: string;
  applicabletaxyear: string;
  notes: string;
}
