import { MlcModel } from './common/mlc.model';

export class Business implements MlcModel {
  name: string;
  ownershiporrole: string;
  partners: string;
  partnerscontactdetails: string;
  contractlocation: string;
  insuranceprovider: string;
  utilityservices: string;
  serviceproviders: string;
  financialadvisororcontact: string;
  accountantnameorcontact: string;
  lawyernameorcontact: string;
  notes: string;
}
