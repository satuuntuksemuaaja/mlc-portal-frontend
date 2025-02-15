import { MlcModel } from './common/mlc.model';

export class MobileDevice implements MlcModel {
  name: string;
  brand: string;
  purchasedate: string;
  purchasedfrom: string;
  plantypeorname: string;
  modeltypeorname: string;
  serialnumber: string;
  cost: string;
  warrantyexpirydate: string;
  notes: string;
}
