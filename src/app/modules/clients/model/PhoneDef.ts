import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Phone } from '../model/PhoneModel';

export class PhoneDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'pw', 'pho'];

  public readonly identifier: string = 'Phone';

  // Item Name
  public readonly name: string = 'Phone';

  public readonly label: string = 'phone';

  public readonly classname: any = Phone;

  public readonly classifications: string[] = PhoneDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Pin', fieldname: 'pin', type: 'text', order: 2 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Phone {
    return new Phone();
  }
}
