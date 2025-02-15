import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Identification } from '../model/IdentificationModel';

export class IdentificationDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'id', 'idt'];

  public readonly identifier: string = 'Identification';

  // Item Name
  public readonly name: string = 'Identification';

  public readonly label: string = 'identification';

  public readonly classname: any = Identification;

  public readonly classifications: string[] = IdentificationDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Number', fieldname: 'number', type: 'text', order: 2 },
    { name: 'StateOfOrigin', fieldname: 'stateoforigin', type: 'text', order: 3 },
    { name: 'ExpiryDate', fieldname: 'expirydate', type: 'date', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Identification {
    return new Identification();
  }
}
