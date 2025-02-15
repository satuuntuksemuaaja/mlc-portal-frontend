import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorProcedureOrOperation } from '../model/JuniorProcedureOrOperationModel';

export class JuniorProcedureOrOperationDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jopn'];

  public readonly identifier: string = 'JuniorProcedureOrOperation';

  // Item Name
  public readonly name: string = 'Junior procedure or operation';

  public readonly label: string = 'juniorprocedureoroperation';

  public readonly classname: any = JuniorProcedureOrOperation;

  public readonly classifications: string[] = JuniorProcedureOrOperationDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'DateOfProcedure', fieldname: 'dateofprocedure', type: 'date', order: 2 },
    { name: 'ProcedurePerformedBy', fieldname: 'procedureperformedby', type: 'text', order: 3 },
    { name: 'ResultsOfProcedure', fieldname: 'resultsofprocedure', type: 'text', order: 4 },
    { name: 'FurtherInstructions', fieldname: 'furtherinstructions', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorProcedureOrOperation {
    return new JuniorProcedureOrOperation();
  }
}
