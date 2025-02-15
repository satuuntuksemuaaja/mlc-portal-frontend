import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Business } from '../model/BusinessModel';

export class BusinessDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'bns'];

  public readonly identifier: string = 'Business';

  // Item Name
  public readonly name: string = 'Business';

  public readonly label: string = 'business';

  public readonly classname: any = Business;

  public readonly classifications: string[] = BusinessDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'OwnershipOrRole', fieldname: 'ownershiporrole', type: 'text', order: 2 },
    { name: 'Partners', fieldname: 'partners', type: 'text', order: 3 },
    { name: 'PartnersContactDetails', fieldname: 'partnerscontactdetails', type: 'text', order: 4 },
    { name: 'ContractLocation', fieldname: 'contractlocation', type: 'text', order: 5 },
    { name: 'InsuranceProvider', fieldname: 'insuranceprovider', type: 'text', order: 6 },
    { name: 'UtilityServices', fieldname: 'utilityservices', type: 'text', order: 7 },
    { name: 'ServiceProviders', fieldname: 'serviceproviders', type: 'text', order: 8 },
    {
      name: 'FinancialAdvisorOrContact',
      fieldname: 'financialadvisororcontact',
      type: 'text',
      order: 9
    },
    {
      name: 'AccountantNameOrContact',
      fieldname: 'accountantnameorcontact',
      type: 'text',
      order: 10
    },
    { name: 'LawyerNameOrContact', fieldname: 'lawyernameorcontact', type: 'text', order: 11 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Business {
    return new Business();
  }
}
