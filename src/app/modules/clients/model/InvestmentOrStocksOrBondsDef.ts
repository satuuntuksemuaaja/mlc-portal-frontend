import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { InvestmentOrStocksOrBonds } from '../model/InvestmentOrStocksOrBondsModel';

export class InvestmentOrStocksOrBondsDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'stk'];

  public readonly identifier: string = 'InvestmentOrStocksOrBonds';

  // Item Name
  public readonly name: string = 'Investment or stocks or bonds';

  public readonly label: string = 'investmentorstocksorbonds';

  public readonly classname: any = InvestmentOrStocksOrBonds;

  public readonly classifications: string[] = InvestmentOrStocksOrBondsDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    {
      name: 'OrganisationOrInstitutionName',
      fieldname: 'organisationorinstitutionname',
      type: 'text',
      order: 2
    },
    {
      name: 'InvestmentNameOrLocation',
      fieldname: 'investmentnameorlocation',
      type: 'text',
      order: 3
    },
    { name: 'InvestmentManagerName', fieldname: 'investmentmanagername', type: 'text', order: 4 },
    {
      name: 'InvestorAccountOrLoginDetail',
      fieldname: 'investoraccountorlogindetail',
      type: 'text',
      order: 5
    },
    {
      name: 'LocationOfStocksOrCertificates',
      fieldname: 'locationofstocksorcertificates',
      type: 'text',
      order: 6
    },
    {
      name: 'StockTypeAndStockSymbol',
      fieldname: 'stocktypeandstocksymbol',
      type: 'text',
      order: 7
    },
    {
      name: 'NumberOfSharesAndPurchasePrice',
      fieldname: 'numberofsharesandpurchaseprice',
      type: 'text',
      order: 8
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): InvestmentOrStocksOrBonds {
    return new InvestmentOrStocksOrBonds();
  }
}
