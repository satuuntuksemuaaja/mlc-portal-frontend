import { MlcModel } from './common/mlc.model';

export class Vehicle implements MlcModel {
  name: string;
  ownershiporrental: string;
  typeofvehicle: string;
  model: string;
  year: string;
  vin: string;
  registrationnumber: string;
  registrationexpiry: string;
  purchasedate: string;
  nameofselleroragent: string;
  loanaccountinstitutionname: string;
  branchnameorlocation: string;
  accountorloanname: string;
  namesorsignatoriesonloanorrental: string;
  loanorrentalterm: string;
  loanorrentaltype: string;
  customernumber: string;
  loanorrentalexpiryorrenewaldate: string;
  notes: string;
}
