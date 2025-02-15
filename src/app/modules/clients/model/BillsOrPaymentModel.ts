import { MlcModel } from './common/mlc.model';

export class BillsOrPayment implements MlcModel {
  name: string;
  servicetype: string;
  serviceprovider: string;
  accountnumber: string;
  invoiceorreceiptnumber: string;
  notes: string;
}
