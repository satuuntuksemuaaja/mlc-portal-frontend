import { MlcModel } from './common/mlc.model';

export class JuniorBirthCertificate implements MlcModel {
  name: string;
  fullnameoncertificate: string;
  dateofbirth: string;
  placeofbirth: string;
  countryoforigin: string;
  locationofcertificate: string;
  notes: string;
}
