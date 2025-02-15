import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { MediaAlbum } from '../model/MediaAlbumModel';

export class MediaAlbumDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'mm', 'ma', 'albid'];

  public readonly identifier: string = 'MediaAlbum';

  // Item Name
  public readonly name: string = 'Media album';

  public readonly label: string = 'mediaalbum';

  public readonly classname: any = MediaAlbum;

  public readonly classifications: string[] = MediaAlbumDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', label: 'Name', order: 0 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', label: 'Notes', order: 100 }
  ];

  newModel(): MediaAlbum {
    return new MediaAlbum();
  }
}
