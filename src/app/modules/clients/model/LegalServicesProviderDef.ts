import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { LegalServicesProvider } from '../model/LegalServicesProviderModel';

export class LegalServicesProviderDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'lg', 'lsp'];

  public readonly identifier: string = 'LegalServicesProvider';

  // Item Name
  public readonly name: string = 'Legal services provider';

  public readonly label: string = 'legalservicesprovider';

  public readonly classname: any = LegalServicesProvider;

  public readonly classifications: string[] = LegalServicesProviderDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'LawyersName', fieldname: 'lawyersname', type: 'text', order: 2 },
    {
      name: 'LawyersLocationOrAddress',
      fieldname: 'lawyerslocationoraddress',
      type: 'text',
      order: 3
    },
    { name: 'LawyersContactDetails', fieldname: 'lawyerscontactdetails', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): LegalServicesProvider {
    return new LegalServicesProvider();
  }
}
