import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { IllnessOrInjury } from '../model/IllnessOrInjuryModel';

export class IllnessOrInjuryDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'ill'];

  public readonly identifier: string = 'IllnessOrInjury';

  // Item Name
  public readonly name: string = 'Illness or injury';

  public readonly label: string = 'illnessorinjury';

  public readonly classname: any = IllnessOrInjury;

  public readonly classifications: string[] = IllnessOrInjuryDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'NameOfInjuryOrIllness', fieldname: 'nameofinjuryorillness', type: 'text', order: 2 },
    {
      name: 'EffectonHealthOrWellbeing',
      fieldname: 'effectonhealthorwellbeing',
      type: 'text',
      order: 3
    },
    { name: 'MedicationOrTreatment', fieldname: 'medicationortreatment', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): IllnessOrInjury {
    return new IllnessOrInjury();
  }
}
