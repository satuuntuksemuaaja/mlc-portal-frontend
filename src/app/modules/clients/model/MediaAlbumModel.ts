import { MlcModel } from './common/mlc.model';

export class MediaAlbum implements MlcModel {
  name: string;
  albumMediaItems: string[] = [];
  notes: string;
}
