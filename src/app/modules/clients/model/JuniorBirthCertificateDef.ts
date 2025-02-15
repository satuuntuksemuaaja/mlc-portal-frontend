import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorBirthCertificate } from '../model/JuniorBirthCertificateModel';

export class JuniorBirthCertificateDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jid', 'jbct'];

  public readonly identifier: string = 'JuniorBirthCertificate';

  // Item Name
  public readonly name: string = 'Junior birth certificate';

  public readonly label: string = 'juniorbirthcertificate';

  public readonly classname: any = JuniorBirthCertificate;

  public readonly classifications: string[] = JuniorBirthCertificateDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'FullNameOnCertificate', fieldname: 'fullnameoncertificate', type: 'text', order: 2 },
    { name: 'DateOfBirth', fieldname: 'dateofbirth', type: 'date', order: 3 },
    { name: 'PlaceOfBirth', fieldname: 'placeofbirth', type: 'text', order: 4 },
    { name: 'CountryOfOrigin', fieldname: 'countryoforigin', type: 'text', order: 5 },
    { name: 'LocationOfCertificate', fieldname: 'locationofcertificate', type: 'text', order: 6 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorBirthCertificate {
    return new JuniorBirthCertificate();
  }
}
