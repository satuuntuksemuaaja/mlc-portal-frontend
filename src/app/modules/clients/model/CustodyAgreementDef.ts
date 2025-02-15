import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { CustodyAgreement } from '../model/CustodyAgreementModel';

export class CustodyAgreementDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'lg', 'csa'];

  public readonly identifier: string = 'CustodyAgreement';

  // Item Name
  public readonly name: string = 'Custody agreement';

  public readonly label: string = 'custodyagreement';

  public readonly classname: any = CustodyAgreement;

  public readonly classifications: string[] = CustodyAgreementDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    {
      name: 'FullNameOfCustodianOnAgreementOrCertification',
      fieldname: 'fullnameofcustodianonagreementorcertification',
      type: 'text',
      order: 2
    },
    {
      name: 'FullNameOfChildPersonInCustody',
      fieldname: 'fullnameofchildpersonincustody',
      type: 'text',
      order: 3
    },
    { name: 'AdditionalInformation', fieldname: 'additionalinformation', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): CustodyAgreement {
    return new CustodyAgreement();
  }
}
