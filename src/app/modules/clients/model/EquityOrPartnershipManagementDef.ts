import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { EquityOrPartnershipManagement } from '../model/EquityOrPartnershipManagementModel';

export class EquityOrPartnershipManagementDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'eqt'];

  public readonly identifier: string = 'EquityOrPartnershipManagement';

  // Item Name
  public readonly name: string = 'Equity or partnership management';

  public readonly label: string = 'equityorpartnershipmanagement';

  public readonly classname: any = EquityOrPartnershipManagement;

  public readonly classifications: string[] = EquityOrPartnershipManagementDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'EquityType', fieldname: 'equitytype', type: 'text', order: 2 },
    {
      name: 'InvestorOrOrganisationOrInstitutionName',
      fieldname: 'investorororganisationorinstitutionname',
      type: 'text',
      order: 3
    },
    { name: 'InvestmentManagerName', fieldname: 'investmentmanagername', type: 'text', order: 4 },
    { name: 'LocationOfcertificates', fieldname: 'locationofcertificates', type: 'text', order: 5 },
    {
      name: 'NumberOfsharesAndPurchasePrice',
      fieldname: 'numberofsharesandpurchaseprice',
      type: 'text',
      order: 6
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): EquityOrPartnershipManagement {
    return new EquityOrPartnershipManagement();
  }
}
