import { MlcModel } from './common/mlc.model';

export class ServiceProvider implements MlcModel {
  name: string;
  serviceproviderlocationoraddress: string;
  warrantyperiod: string;
  dateoflastservice: string;
  notes: string;
}
