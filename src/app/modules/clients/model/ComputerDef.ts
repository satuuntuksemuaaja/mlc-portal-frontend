import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Computer } from '../model/ComputerModel';

export class ComputerDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'dvc'];

  public readonly identifier: string = 'Computer';

  // Item Name
  public readonly name: string = 'Computer';

  public readonly label: string = 'computer';

  public readonly classname: any = Computer;

  public readonly classifications: string[] = ComputerDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Brand', fieldname: 'brand', type: 'text', order: 2 },
    { name: 'PurchaseDate', fieldname: 'purchasedate', type: 'date', order: 3 },
    { name: 'PurchasedFrom', fieldname: 'purchasedfrom', type: 'date', order: 4 },
    { name: 'PlanTypeOrName', fieldname: 'plantypeorname', type: 'text', order: 5 },
    { name: 'ModelTypeOrName', fieldname: 'modeltypeorname', type: 'text', order: 6 },
    { name: 'SerialNumber', fieldname: 'serialnumber', type: 'text', order: 7 },
    { name: 'Cost', fieldname: 'cost', type: 'text', order: 8 },
    { name: 'WarrantyExpiryDate', fieldname: 'warrantyexpirydate', type: 'date', order: 9 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Computer {
    return new Computer();
  }
}
