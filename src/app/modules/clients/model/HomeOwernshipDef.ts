import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { HomeOwernship } from '../model/HomeOwernshipModel';

export class HomeOwernshipDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'hmo'];

  public readonly identifier: string = 'HomeOwernship';

  // Item Name
  public readonly name: string = 'Home owernship';

  public readonly label: string = 'homeowernship';

  public readonly classname: any = HomeOwernship;

  public readonly classifications: string[] = HomeOwernshipDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'PropertyOrHomeAddress', fieldname: 'propertyorhomeaddress', type: 'text', order: 2 },
    { name: 'Ownership', fieldname: 'ownership', type: 'text', order: 3 },
    { name: 'NameOfSellerOrAgent', fieldname: 'nameofselleroragent', type: 'text', order: 4 },
    {
      name: 'MortgageOrLoanAccountInstitutionName',
      fieldname: 'mortgageorloanaccountinstitutionname',
      type: 'text',
      order: 5
    },
    { name: 'BranchNameOrLocation', fieldname: 'branchnameorlocation', type: 'text', order: 6 },
    { name: 'AccountOrLoanName', fieldname: 'accountorloanname', type: 'text', order: 7 },
    {
      name: 'NamesOrSignatoriesOnloan',
      fieldname: 'namesorsignatoriesonloan',
      type: 'text',
      order: 8
    },
    { name: 'LoanTerm', fieldname: 'loanterm', type: 'text', order: 9 },
    { name: 'LoanType', fieldname: 'loantype', type: 'text', order: 10 },
    { name: 'CustomerNumber', fieldname: 'customernumber', type: 'text', order: 11 },
    {
      name: 'LoanExpiryOrRenewalDate',
      fieldname: 'loanexpiryorrenewaldate',
      type: 'date',
      order: 12
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): HomeOwernship {
    return new HomeOwernship();
  }
}
