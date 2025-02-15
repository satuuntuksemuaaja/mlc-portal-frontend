import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorFamilyMedicalHistory } from '../model/JuniorFamilyMedicalHistoryModel';

export class JuniorFamilyMedicalHistoryDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jfmh'];

  public readonly identifier: string = 'JuniorFamilyMedicalHistory';

  // Item Name
  public readonly name: string = 'Junior family medical history';

  public readonly label: string = 'juniorfamilymedicalhistory';

  public readonly classname: any = JuniorFamilyMedicalHistory;

  public readonly classifications: string[] = JuniorFamilyMedicalHistoryDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'PersonsAffected', fieldname: 'personsaffected', type: 'text', order: 2 },
    { name: 'LineageOrSideOfFamily', fieldname: 'lineageorsideoffamily', type: 'text', order: 3 },
    { name: 'AffectOrOutcome', fieldname: 'affectoroutcome', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorFamilyMedicalHistory {
    return new JuniorFamilyMedicalHistory();
  }
}
