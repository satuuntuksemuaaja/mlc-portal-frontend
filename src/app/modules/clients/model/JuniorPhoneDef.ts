import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorPhone } from '../model/JuniorPhoneModel';

export class JuniorPhoneDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jpw', 'jpho'];

  public readonly identifier: string = 'JuniorPhone';

  // Item Name
  public readonly name: string = 'Junior phone';

  public readonly label: string = 'juniorphone';

  public readonly classname: any = JuniorPhone;

  public readonly classifications: string[] = JuniorPhoneDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Pin', fieldname: 'pin', type: 'text', order: 2 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorPhone {
    return new JuniorPhone();
  }
}
