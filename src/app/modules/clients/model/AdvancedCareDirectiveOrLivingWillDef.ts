import { AdvancedCareDirectiveOrLivingWill } from '../model/AdvancedCareDirectiveOrLivingWillModel';
import { MlcDef } from './common/mlc.def';
import { MlcField } from './common/mlc.field';

export class AdvancedCareDirectiveOrLivingWillDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'lg', 'lvw'];

  public readonly identifier: string = 'AdvancedCareDirectiveOrLivingWill';

  // Item Name
  public readonly name: string = 'Advanced care directive or living will';

  public readonly label: string = 'advancedcaredirectiveorlivingwill';

  public readonly classname: any = AdvancedCareDirectiveOrLivingWill;

  public readonly classifications: string[] =
    AdvancedCareDirectiveOrLivingWillDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    {
      name: 'FullNameOnAdvancedCareDirective',
      fieldname: 'fullnameonadvancedcaredirective',
      type: 'text',
      order: 2
    },
    { name: 'DateOfExecution', fieldname: 'dateofexecution', type: 'date', order: 3 },
    {
      name: 'LocationOfAdvancedCareDirective',
      fieldname: 'locationofadvancedcaredirective',
      type: 'text',
      order: 4
    },
    {
      name: 'NameOfExecutorOfAdvancedCareDirective',
      fieldname: 'nameofexecutorofadvancedcaredirective',
      type: 'text',
      order: 5
    },
    {
      name: 'ContactDetailsOfExecutor',
      fieldname: 'contactdetailsofexecutor',
      type: 'text',
      order: 6
    },
    {
      name: 'LegalRepresentativeOrMedicalProvider',
      fieldname: 'legalrepresentativeormedicalprovider',
      type: 'text',
      order: 7
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): AdvancedCareDirectiveOrLivingWill {
    return new AdvancedCareDirectiveOrLivingWill();
  }
}
