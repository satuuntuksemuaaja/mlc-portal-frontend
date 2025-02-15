import { BankAccount } from '../model/BankAccountModel';
import { MlcDef } from './common/mlc.def';
import { MlcField } from './common/mlc.field';

export class BankAccountDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'bnk'];

  public readonly identifier: string = 'BankAccount';

  // Item Name
  public readonly name: string = 'Bank account';

  public readonly label: string = 'bankaccount';

  public readonly classname: any = BankAccount;

  public readonly classifications: string[] = BankAccountDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    {
      name: 'BankOrInstitutionName',
      fieldname: 'bankorinstitutionname',
      type: 'text',
      order: 2
    },
    {
      name: 'BranchNameOrLocation',
      fieldname: 'branchnameorlocation',
      type: 'text',
      order: 3
    },
    {
      name: 'AccountOrLoanName',
      fieldname: 'accountorloanname',
      type: 'text',
      order: 4
    },
    { name: 'AccountType', fieldname: 'accounttype', type: 'text', order: 5 },
    { name: 'BSBOrSWIFT', fieldname: 'bsborswift', type: 'text', order: 6 },
    {
      name: 'AccountOrCardNumber',
      fieldname: 'accountorcardnumber',
      type: 'text',
      order: 7
    },
    {
      name: 'SecurityCodeOrCCV',
      fieldname: 'securitycodeorccv',
      type: 'text',
      order: 8
    },
    { name: 'CreditLimit', fieldname: 'creditlimit', type: 'text', order: 9 },
    {
      name: 'AccountSignatories',
      fieldname: 'accountsignatories',
      type: 'text',
      order: 10
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): BankAccount {
    return new BankAccount();
  }
}
