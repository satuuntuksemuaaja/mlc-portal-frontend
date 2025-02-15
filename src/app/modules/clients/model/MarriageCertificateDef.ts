import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { MarriageCertificate } from '../model/MarriageCertificateModel';

export class MarriageCertificateDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'lg', 'mrc'];

  public readonly identifier: string = 'MarriageCertificate';

  // Item Name
  public readonly name: string = 'Marriage certificate';

  public readonly label: string = 'marriagecertificate';

  public readonly classname: any = MarriageCertificate;

  public readonly classifications: string[] = MarriageCertificateDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'FullNameOnCertificate', fieldname: 'fullnameoncertificate', type: 'text', order: 2 },
    { name: 'DateOfExecution', fieldname: 'dateofexecution', type: 'date', order: 3 },
    { name: 'LocationOfCertificate', fieldname: 'locationofcertificate', type: 'text', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): MarriageCertificate {
    return new MarriageCertificate();
  }
}
