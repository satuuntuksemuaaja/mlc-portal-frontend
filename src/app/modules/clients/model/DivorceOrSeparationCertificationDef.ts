import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { DivorceOrSeparationCertification } from '../model/DivorceOrSeparationCertificationModel';

export class DivorceOrSeparationCertificationDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'lg', 'dsc'];

  public readonly identifier: string = 'DivorceOrSeparationCertification';

  // Item Name
  public readonly name: string = 'Divorce or separation certification';

  public readonly label: string = 'divorceorseparationcertification';

  public readonly classname: any = DivorceOrSeparationCertification;

  public readonly classifications: string[] =
    DivorceOrSeparationCertificationDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'FullNamesOnCertificate', fieldname: 'fullnamesoncertificate', type: 'text', order: 2 },
    { name: 'DateOfExecution', fieldname: 'dateofexecution', type: 'date', order: 3 },
    { name: 'LocationOfCertificate', fieldname: 'locationofcertificate', type: 'text', order: 4 },
    { name: 'AdditionalInformation', fieldname: 'additionalinformation', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): DivorceOrSeparationCertification {
    return new DivorceOrSeparationCertification();
  }
}
