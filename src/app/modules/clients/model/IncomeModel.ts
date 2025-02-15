import { MlcModel } from './common/mlc.model';

export class Income implements MlcModel {
  name: string;
  source: string;
  quantity: string;
  incomeorbenefitnumber: string;
  contractdate: string;
  contractexpiry: string;
  notes: string;
}
