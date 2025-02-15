import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorIllnessOrInjury } from '../model/JuniorIllnessOrInjuryModel';

export class JuniorIllnessOrInjuryDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jill'];

  public readonly identifier: string = 'JuniorIllnessOrInjury';

  // Item Name
  public readonly name: string = 'Junior illness or injury';

  public readonly label: string = 'juniorillnessorinjury';

  public readonly classname: any = JuniorIllnessOrInjury;

  public readonly classifications: string[] = JuniorIllnessOrInjuryDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'NameOfInjuryOrIllness', fieldname: 'nameofinjuryorillness', type: 'text', order: 2 },
    {
      name: 'EffectOnHealthOrWellbeing',
      fieldname: 'effectonhealthorwellbeing',
      type: 'text',
      order: 3
    },
    { name: 'MedicationOrTreatment', fieldname: 'medicationortreatment', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorIllnessOrInjury {
    return new JuniorIllnessOrInjury();
  }
}
