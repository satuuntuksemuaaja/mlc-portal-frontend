import { MlcModel } from './common/mlc.model';

export class MarriageCertificate implements MlcModel {
  name: string;
  fullnameoncertificate: string;
  dateofexecution: string;
  locationofcertificate: string;
  notes: string;
}
