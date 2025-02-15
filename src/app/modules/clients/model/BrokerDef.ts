import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Broker } from '../model/BrokerModel';

export class BrokerDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'brk'];

  public readonly identifier: string = 'Broker';

  // Item Name
  public readonly name: string = 'Broker';

  public readonly label: string = 'broker';

  public readonly classname: any = Broker;

  public readonly classifications: string[] = BrokerDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'BusinessName', fieldname: 'businessname', type: 'text', order: 2 },
    { name: 'ContactDetail', fieldname: 'contactdetail', type: 'text', order: 3 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Broker {
    return new Broker();
  }
}
