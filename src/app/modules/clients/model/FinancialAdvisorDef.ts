import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { FinancialAdvisor } from '../model/FinancialAdvisorModel';

export class FinancialAdvisorDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'fna'];

  public readonly identifier: string = 'FinancialAdvisor';

  // Item Name
  public readonly name: string = 'Financial advisor';

  public readonly label: string = 'financialadvisor';

  public readonly classname: any = FinancialAdvisor;

  public readonly classifications: string[] = FinancialAdvisorDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'BusinessName', fieldname: 'businessname', type: 'text', order: 2 },
    { name: 'ContactDetail', fieldname: 'contactdetail', type: 'text', order: 3 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): FinancialAdvisor {
    return new FinancialAdvisor();
  }
}
