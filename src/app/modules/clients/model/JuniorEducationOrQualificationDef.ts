import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorEducationOrQualification } from '../model/JuniorEducationOrQualificationModel';

export class JuniorEducationOrQualificationDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jed', 'jeqf'];

  public readonly identifier: string = 'JuniorEducationOrQualification';

  // Item Name
  public readonly name: string = 'Junior education or qualification';

  public readonly label: string = 'junioreducationorqualification';

  public readonly classname: any = JuniorEducationOrQualification;

  public readonly classifications: string[] = JuniorEducationOrQualificationDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Location', fieldname: 'location', type: 'text', order: 2 },
    { name: 'DateStarted', fieldname: 'datestarted', type: 'date', order: 3 },
    { name: 'DateFinished', fieldname: 'datefinished', type: 'date', order: 4 },
    { name: 'SchoolIdOrLogin', fieldname: 'schoolidorlogin', type: 'text', order: 5 },
    { name: 'Grades', fieldname: 'grades', type: 'text', order: 6 },
    { name: 'Highlights', fieldname: 'highlights', type: 'text', order: 7 },
    { name: 'TeacherNames', fieldname: 'teachernames', type: 'text', order: 8 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorEducationOrQualification {
    return new JuniorEducationOrQualification();
  }
}
