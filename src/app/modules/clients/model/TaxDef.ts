import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Tax } from '../model/TaxModel';

export class TaxDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'tax'];

  public readonly identifier: string = 'Tax';

  // Item Name
  public readonly name: string = 'Tax';

  public readonly label: string = 'tax';

  public readonly classname: any = Tax;

  public readonly classifications: string[] = TaxDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'TaxType', fieldname: 'taxtype', type: 'text', order: 2 },
    { name: 'TaxName', fieldname: 'taxname', type: 'text', order: 3 },
    { name: 'TaxAccountantName', fieldname: 'taxaccountantname', type: 'text', order: 4 },
    { name: 'ApplicableTaxYear', fieldname: 'applicabletaxyear', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Tax {
    return new Tax();
  }
}
