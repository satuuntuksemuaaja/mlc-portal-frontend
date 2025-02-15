import { MlcModel } from './common/mlc.model';

export class AdvancedCareDirectiveOrLivingWill implements MlcModel {
  name: string;
  fullnameonadvancedcaredirective: string;
  dateofexecution: string;
  locationofadvancedcaredirective: string;
  nameofexecutorofadvancedcaredirective: string;
  contactdetailsofexecutor: string;
  legalrepresentativeormedicalprovider: string;
  notes: string;
}
