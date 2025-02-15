import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { ValuableItemOrAsset } from '../model/ValuableItemOrAssetModel';

export class ValuableItemOrAssetDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'vlb'];

  public readonly identifier: string = 'ValuableItemOrAsset';

  // Item Name
  public readonly name: string = 'Valuable item or asset';

  public readonly label: string = 'valuableitemorasset';

  public readonly classname: any = ValuableItemOrAsset;

  public readonly classifications: string[] = ValuableItemOrAssetDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'AssetValue', fieldname: 'assetvalue', type: 'text', order: 2 },
    { name: 'AssetLocation', fieldname: 'assetlocation', type: 'text', order: 3 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): ValuableItemOrAsset {
    return new ValuableItemOrAsset();
  }
}
