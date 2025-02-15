import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { ResumeOrCurriculumVitae } from '../model/ResumeOrCurriculumVitaeModel';

export class ResumeOrCurriculumVitaeDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'ed', 'res'];

  public readonly identifier: string = 'ResumeOrCurriculumVitae';

  // Item Name
  public readonly name: string = 'Resume or curriculum vitae';

  public readonly label: string = 'resumeorcurriculumvitae';

  public readonly classname: any = ResumeOrCurriculumVitae;

  public readonly classifications: string[] = ResumeOrCurriculumVitaeDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'ResumePurpose', fieldname: 'resumepurpose', type: 'text', order: 2 },
    { name: 'ResumePreparationDate', fieldname: 'resumepreparationdate', type: 'text', order: 3 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): ResumeOrCurriculumVitae {
    return new ResumeOrCurriculumVitae();
  }
}
