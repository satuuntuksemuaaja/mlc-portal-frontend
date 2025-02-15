import { MlcModel } from './common/mlc.model';

export class InvestmentOrStocksOrBonds implements MlcModel {
  name: string;
  organisationorinstitutionname: string;
  investmentnameorlocation: string;
  investmentmanagername: string;
  investoraccountorlogindetail: string;
  locationofstocksorcertificates: string;
  stocktypeandstocksymbol: string;
  numberofsharesandpurchaseprice: string;
  notes: string;
}
