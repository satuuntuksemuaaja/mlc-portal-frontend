import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorTestResults } from '../model/JuniorTestResultsModel';

export class JuniorTestResultsDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jres'];

  public readonly identifier: string = 'JuniorTestResults';

  // Item Name
  public readonly name: string = 'Junior test results';

  public readonly label: string = 'juniortestresults';

  public readonly classname: any = JuniorTestResults;

  public readonly classifications: string[] = JuniorTestResultsDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'AdministeredBy', fieldname: 'administeredby', type: 'text', order: 2 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 3 },
    { name: 'Results', fieldname: 'results', type: 'text', order: 4 },
    { name: 'FurtherInstructions', fieldname: 'furtherinstructions', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorTestResults {
    return new JuniorTestResults();
  }
}
