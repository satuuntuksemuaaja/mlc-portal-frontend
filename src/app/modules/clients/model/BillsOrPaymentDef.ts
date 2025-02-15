import { BillsOrPayment } from '../model/BillsOrPaymentModel';
import { MlcDef } from './common/mlc.def';
import { MlcField } from './common/mlc.field';

export class BillsOrPaymentDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'bil'];

  public readonly identifier: string = 'BillsOrPayment';

  // Item Name
  public readonly name: string = 'Bills or payment';

  public readonly label: string = 'billsorpayment';

  public readonly classname: any = BillsOrPayment;

  public readonly classifications: string[] = BillsOrPaymentDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'ServiceType', fieldname: 'servicetype', type: 'text', order: 2 },
    { name: 'ServiceProvider', fieldname: 'serviceprovider', type: 'text', order: 3 },
    { name: 'AccountNumber', fieldname: 'accountnumber', type: 'text', order: 4 },
    { name: 'InvoiceOrReceiptNumber', fieldname: 'invoiceorreceiptnumber', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): BillsOrPayment {
    return new BillsOrPayment();
  }
}
