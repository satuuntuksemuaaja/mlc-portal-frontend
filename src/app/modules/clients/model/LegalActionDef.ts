import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { LegalAction } from '../model/LegalActionModel';

export class LegalActionDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'lg', 'lga'];

  public readonly identifier: string = 'LegalAction';

  // Item Name
  public readonly name: string = 'Legal action';

  public readonly label: string = 'legalaction';

  public readonly classname: any = LegalAction;

  public readonly classifications: string[] = LegalActionDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'NameOrCaseDescription', fieldname: 'nameorcasedescription', type: 'text', order: 2 },
    {
      name: 'LocationOfLegalDocumentation',
      fieldname: 'locationoflegaldocumentation',
      type: 'text',
      order: 3
    },
    {
      name: 'NameOfLegalRepresentative',
      fieldname: 'nameoflegalrepresentative',
      type: 'text',
      order: 4
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): LegalAction {
    return new LegalAction();
  }
}
