import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { CreditCard } from '../model/CreditCardModel';

export class CreditCardDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'ccd'];

  public readonly identifier: string = 'CreditCard';

  // Item Name
  public readonly name: string = 'Credit card';

  public readonly label: string = 'creditcard';

  public readonly classname: any = CreditCard;

  public readonly classifications: string[] = CreditCardDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'BankName', fieldname: 'bankname', type: 'text', order: 2 },
    { name: 'SecurityCodeOrCCV', fieldname: 'securitycodeorccv', type: 'text', order: 3 },
    { name: 'CreditLimit', fieldname: 'creditlimit', type: 'text', order: 4 },
    { name: 'ExpiryDate', fieldname: 'expirydate', type: 'date', order: 5 },
    { name: 'CardRewardScheme', fieldname: 'cardrewardscheme', type: 'text', order: 6 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): CreditCard {
    return new CreditCard();
  }
}
