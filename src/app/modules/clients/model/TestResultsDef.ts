import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { TestResults } from '../model/TestResultsModel';

export class TestResultsDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'res'];

  public readonly identifier: string = 'TestResults';

  // Item Name
  public readonly name: string = 'Test results';

  public readonly label: string = 'testresults';

  public readonly classname: any = TestResults;

  public readonly classifications: string[] = TestResultsDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'AdministeredBy', fieldname: 'administeredby', type: 'text', order: 2 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 3 },
    { name: 'Results', fieldname: 'results', type: 'text', order: 4 },
    { name: 'FurtherInstructions', fieldname: 'furtherinstructions', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): TestResults {
    return new TestResults();
  }
}
