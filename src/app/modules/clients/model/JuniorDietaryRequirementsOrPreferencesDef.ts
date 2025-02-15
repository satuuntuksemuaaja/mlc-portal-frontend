import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorDietaryRequirementsOrPreferences } from '../model/JuniorDietaryRequirementsOrPreferencesModel';

export class JuniorDietaryRequirementsOrPreferencesDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jdrt'];

  public readonly identifier: string = 'JuniorDietaryRequirementsOrPreferences';

  // Item Name
  public readonly name: string = 'Junior dietary requirements or preferences';

  public readonly label: string = 'juniordietaryrequirementsorpreferences';

  public readonly classname: any = JuniorDietaryRequirementsOrPreferences;

  public readonly classifications: string[] =
    JuniorDietaryRequirementsOrPreferencesDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'SymptomsIfConsumed', fieldname: 'symptomsifconsumed', type: 'text', order: 2 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorDietaryRequirementsOrPreferences {
    return new JuniorDietaryRequirementsOrPreferences();
  }
}
