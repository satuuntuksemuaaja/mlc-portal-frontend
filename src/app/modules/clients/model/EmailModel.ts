import { MlcModel } from './common/mlc.model';

export class Email implements MlcModel {
  name: string;
  username: string;
  password: string;
  websiteaddress: string;
  notes: string;
}
