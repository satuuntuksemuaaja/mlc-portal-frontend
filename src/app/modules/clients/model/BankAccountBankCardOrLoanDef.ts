import { BankAccountBankCardOrLoan } from '../model/BankAccountBankCardOrLoanModel';
import { MlcDef } from './common/mlc.def';
import { MlcField } from './common/mlc.field';

export class BankAccountBankCardOrLoanDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'bal'];

  public readonly identifier: string = 'BankAccountBankCardOrLoan';

  // Item Name
  public readonly name: string = 'Bank account bank card or loan';

  public readonly label: string = 'bankaccountbankcardorloan';

  public readonly classname: any = BankAccountBankCardOrLoan;

  public readonly classifications: string[] = BankAccountBankCardOrLoanDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    {
      name: 'BranchNameOrLocation',
      fieldname: 'branchnameorlocation',
      type: 'text',
      order: 2
    },
    {
      name: 'AccountOrLoanName',
      fieldname: 'accountorloanname',
      type: 'text',
      order: 3
    },
    { name: 'AccountType', fieldname: 'accounttype', type: 'text', order: 4 },
    { name: 'BSBOrSWIFT', fieldname: 'bsborswift', type: 'text', order: 5 },
    {
      name: 'AccountOrCardNumber',
      fieldname: 'accountorcardnumber',
      type: 'text',
      order: 6
    },
    {
      name: 'SecurityCodeCCV',
      fieldname: 'securitycodeccv',
      type: 'text',
      order: 7
    },
    { name: 'CreditLimit', fieldname: 'creditlimit', type: 'text', order: 8 },
    {
      name: 'CardRewardScheme',
      fieldname: 'cardrewardscheme',
      type: 'text',
      order: 9
    },
    {
      name: 'CustomerOrLoanNumber',
      fieldname: 'customerorloannumber',
      type: 'text',
      order: 10
    },
    {
      name: 'AccountSignatories',
      fieldname: 'accountsignatories',
      type: 'text',
      order: 11
    },
    {
      name: 'AccountExpiryOrRenewalDate',
      fieldname: 'accountexpiryorrenewaldate',
      type: 'date',
      order: 12
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): BankAccountBankCardOrLoan {
    return new BankAccountBankCardOrLoan();
  }
}
