/* eslint-disable id-blacklist */
import { MlcModel } from './common/mlc.model';

export class OtherId implements MlcModel {
  name: string;
  fullname: string;
  number: string;
  originofissue: string;
  dateofissue: string;
  expirydate: string;
  notes: string;
}
