import { MlcModel } from './common/mlc.model';

export class Will implements MlcModel {
  name: string;
  fullnameonlegalwill: string;
  dateofexecution: string;
  locationoflegalwill: string;
  nameofexecutoroflegalwill: string;
  contactdetailsofexecutor: string;
  legalrepresentativeorprovider: string;
  notes: string;
}
