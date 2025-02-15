import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorSchoolReport } from '../model/JuniorSchoolReportModel';

export class JuniorSchoolReportDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jed', 'jsrp'];

  public readonly identifier: string = 'JuniorSchoolReport';

  // Item Name
  public readonly name: string = 'Junior school report';

  public readonly label: string = 'juniorschoolreport';

  public readonly classname: any = JuniorSchoolReport;

  public readonly classifications: string[] = JuniorSchoolReportDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'School', fieldname: 'school', type: 'text', order: 2 },
    { name: 'Year', fieldname: 'year', type: 'text', order: 3 },
    { name: 'ResultSummary', fieldname: 'resultsummary', type: 'text', order: 4 },
    { name: 'NewGoals', fieldname: 'newgoals', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorSchoolReport {
    return new JuniorSchoolReport();
  }
}
