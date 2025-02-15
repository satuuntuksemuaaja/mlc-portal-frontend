import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { FamilyMedicalHistory } from '../model/FamilyMedicalHistoryModel';

export class FamilyMedicalHistoryDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'fmh'];

  public readonly identifier: string = 'FamilyMedicalHistory';

  // Item Name
  public readonly name: string = 'Family medical history';

  public readonly label: string = 'familymedicalhistory';

  public readonly classname: any = FamilyMedicalHistory;

  public readonly classifications: string[] = FamilyMedicalHistoryDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'PersonsAffected', fieldname: 'personsaffected', type: 'text', order: 2 },
    { name: 'LineageOrSideOfFamily', fieldname: 'lineageorsideoffamily', type: 'text', order: 3 },
    { name: 'AffectOrOutcome', fieldname: 'affectoroutcome', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): FamilyMedicalHistory {
    return new FamilyMedicalHistory();
  }
}
