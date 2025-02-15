import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Vehicle } from '../model/VehicleModel';

export class VehicleDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'vhc'];

  public readonly identifier: string = 'Vehicle';

  // Item Name
  public readonly name: string = 'Vehicle';

  public readonly label: string = 'vehicle';

  public readonly classname: any = Vehicle;

  public readonly classifications: string[] = VehicleDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'OwnershipOrRental', fieldname: 'ownershiporrental', type: 'text', order: 2 },
    { name: 'TypeOfVehicle', fieldname: 'typeofvehicle', type: 'text', order: 3 },
    { name: 'Model', fieldname: 'model', type: 'text', order: 4 },
    { name: 'Year', fieldname: 'year', type: 'text', order: 5 },
    { name: 'VIN', fieldname: 'vin', type: 'text', order: 6 },
    { name: 'RegistrationNumber', fieldname: 'registrationnumber', type: 'text', order: 7 },
    { name: 'RegistrationExpiry', fieldname: 'registrationexpiry', type: 'text', order: 8 },
    { name: 'PurchaseDate', fieldname: 'purchasedate', type: 'date', order: 9 },
    { name: 'NameOfSellerOrAgent', fieldname: 'nameofselleroragent', type: 'text', order: 10 },
    {
      name: 'LoanAccountInstitutionName',
      fieldname: 'loanaccountinstitutionname',
      type: 'text',
      order: 11
    },
    { name: 'BranchNameOrLocation', fieldname: 'branchnameorlocation', type: 'text', order: 12 },
    { name: 'AccountOrLoanName', fieldname: 'accountorloanname', type: 'text', order: 13 },
    {
      name: 'NamesOrSignatoriesOnloanOrRental',
      fieldname: 'namesorsignatoriesonloanorrental',
      type: 'text',
      order: 14
    },
    { name: 'LoanOrRentalTerm', fieldname: 'loanorrentalterm', type: 'text', order: 15 },
    { name: 'LoanOrRentalType', fieldname: 'loanorrentaltype', type: 'text', order: 16 },
    { name: 'CustomerNumber', fieldname: 'customernumber', type: 'text', order: 17 },
    {
      name: 'LoanOrRentalExpiryOrRenewalDate',
      fieldname: 'loanorrentalexpiryorrenewaldate',
      type: 'date',
      order: 18
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): Vehicle {
    return new Vehicle();
  }
}
