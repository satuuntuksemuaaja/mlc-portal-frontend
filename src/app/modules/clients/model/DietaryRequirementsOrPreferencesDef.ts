import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { DietaryRequirementsOrPreferences } from '../model/DietaryRequirementsOrPreferencesModel';

export class DietaryRequirementsOrPreferencesDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'drt'];

  public readonly identifier: string = 'DietaryRequirementsOrPreferences';

  // Item Name
  public readonly name: string = 'Dietary requirements or preferences';

  public readonly label: string = 'dietaryrequirementsorpreferences';

  public readonly classname: any = DietaryRequirementsOrPreferences;

  public readonly classifications: string[] =
    DietaryRequirementsOrPreferencesDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'SymptomsIfConsumed', fieldname: 'symptomsifconsumed', type: 'text', order: 2 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): DietaryRequirementsOrPreferences {
    return new DietaryRequirementsOrPreferences();
  }
}
