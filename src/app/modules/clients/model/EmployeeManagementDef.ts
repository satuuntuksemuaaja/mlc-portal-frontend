import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { EmployeeManagement } from '../model/EmployeeManagementModel';

export class EmployeeManagementDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'emm'];

  public readonly identifier: string = 'EmployeeManagement';

  // Item Name
  public readonly name: string = 'Employee management';

  public readonly label: string = 'employeemanagement';

  public readonly classname: any = EmployeeManagement;

  public readonly classifications: string[] = EmployeeManagementDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'ContractDate', fieldname: 'contractdate', type: 'date', order: 2 },
    { name: 'ContractExpiry', fieldname: 'contractexpiry', type: 'text', order: 3 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): EmployeeManagement {
    return new EmployeeManagement();
  }
}
