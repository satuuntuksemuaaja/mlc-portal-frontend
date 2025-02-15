import { MlcModel } from './common/mlc.model';

export class DivorceOrSeparationCertification implements MlcModel {
  name: string;
  fullnamesoncertificate: string;
  dateofexecution: string;
  locationofcertificate: string;
  additionalinformation: string;
  notes: string;
}
