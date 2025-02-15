import { MlcModel } from './common/mlc.model';

export class EquityOrPartnershipManagement implements MlcModel {
  name: string;
  equitytype: string;
  investorororganisationorinstitutionname: string;
  investmentmanagername: string;
  locationofcertificates: string;
  numberofsharesandpurchaseprice: string;
  notes: string;
}
