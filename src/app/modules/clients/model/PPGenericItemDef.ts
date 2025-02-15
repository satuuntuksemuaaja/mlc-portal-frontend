import { MlcDef } from './common/mlc.def';
import { MlcField } from './common/mlc.field';
import { PPGenericItem } from './PPGenericItemModel';

export class PPGenericItemDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'acc'];

  public readonly identifier: string = 'PPGenericItem';

  // Item Name
  public readonly name: string = 'PPGenericItem';

  public readonly label: string = 'ppgenericitem';

  public readonly classname: any = PPGenericItem;

  public readonly classifications: string[] = PPGenericItemDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): PPGenericItem {
    return new PPGenericItem();
  }
}
