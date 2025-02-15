import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Income } from '../model/IncomeModel';

export class IncomeDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'inc'];

  public readonly identifier: string = 'Income';

  // Item Name
  public readonly name: string = 'Income';

  public readonly label: string = 'income';

  public readonly classname: any = Income;

  public readonly classifications: string[] = IncomeDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Source', fieldname: 'source', type: 'text', order: 2 },
    { name: 'Quantity', fieldname: 'quantity', type: 'text', order: 3 },
    { name: 'IncomeOrBenefitNumber', fieldname: 'incomeorbenefitnumber', type: 'text', order: 4 },
    { name: 'ContractDate', fieldname: 'contractdate', type: 'date', order: 5 },
    { name: 'ContractExpiry', fieldname: 'contractexpiry', type: 'date', order: 6 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Income {
    return new Income();
  }
}
