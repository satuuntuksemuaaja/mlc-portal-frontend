import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { TaxFileNumber } from '../model/TaxFileNumberModel';

export class TaxFileNumberDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'tfn'];

  public readonly identifier: string = 'TaxFileNumber';

  // Item Name
  public readonly name: string = 'Tax file number';

  public readonly label: string = 'taxfilenumber';

  public readonly classname: any = TaxFileNumber;

  public readonly classifications: string[] = TaxFileNumberDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'TaxFileNumber', fieldname: 'taxfilenumber', type: 'text', order: 2 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): TaxFileNumber {
    return new TaxFileNumber();
  }
}
