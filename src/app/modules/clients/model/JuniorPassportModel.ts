import { MlcModel } from './common/mlc.model';

export class JuniorPassport implements MlcModel {
  name: string;
  fullname: string;
  dateofbirth: string;
  placeofbirth: string;
  gender: string;
  passportnumber: string;
  countryoforigin: string;
  dateofissue: string;
  expirydate: string;
  notes: string;
}
