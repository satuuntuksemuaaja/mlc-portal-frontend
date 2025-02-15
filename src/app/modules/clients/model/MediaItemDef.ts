import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { MediaItem } from '../model/MediaItemModel';

export class MediaItemDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'mm', 'mi', 'ami'];

  public readonly identifier: string = 'MediaItem';

  // Item Name
  public readonly name: string = 'Media item';

  public readonly label: string = 'mediaitem';

  public readonly classname: any = MediaItem;

  public readonly classifications: string[] = MediaItemDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', label: 'Name', order: 0 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', label: 'Notes', order: 100 }
  ];

  newModel(): MediaItem {
    return new MediaItem();
  }
}
