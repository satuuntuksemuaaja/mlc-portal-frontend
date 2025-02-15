import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { ProcedureOrOperation } from '../model/ProcedureOrOperationModel';

export class ProcedureOrOperationDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'opn'];

  public readonly identifier: string = 'ProcedureOrOperation';

  // Item Name
  public readonly name: string = 'Procedure or operation';

  public readonly label: string = 'procedureoroperation';

  public readonly classname: any = ProcedureOrOperation;

  public readonly classifications: string[] = ProcedureOrOperationDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'DateOfProcedure', fieldname: 'dateofprocedure', type: 'date', order: 2 },
    { name: 'ProcedurePerformedBy', fieldname: 'procedureperformedby', type: 'text', order: 3 },
    { name: 'ResultsOfProcedure', fieldname: 'resultsofprocedure', type: 'text', order: 4 },
    { name: 'FurtherInstructions', fieldname: 'furtherinstructions', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): ProcedureOrOperation {
    return new ProcedureOrOperation();
  }
}
