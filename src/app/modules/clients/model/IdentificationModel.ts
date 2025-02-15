/* eslint-disable id-blacklist */
import { MlcModel } from './common/mlc.model';

export class Identification implements MlcModel {
  name: string;
  number: string;
  stateoforigin: string;
  expirydate: string;
  notes: string;
}
