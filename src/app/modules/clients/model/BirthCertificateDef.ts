import { BirthCertificate } from '../model/BirthCertificateModel';
import { MlcDef } from './common/mlc.def';
import { MlcField } from './common/mlc.field';

export class BirthCertificateDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'id', 'bct'];

  public readonly identifier: string = 'BirthCertificate';

  public readonly label: string = 'birthcertificate';
  // Item Name
  public readonly name: string = 'Birth certificate';

  public readonly classname: any = BirthCertificate;

  public readonly classifications: string[] = BirthCertificateDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'FullNameOnCertificate', fieldname: 'fullnameoncertificate', type: 'text', order: 2 },
    { name: 'DateOfBirth', fieldname: 'dateofbirth', type: 'date', order: 3 },
    { name: 'PlaceOfBirth', fieldname: 'placeofbirth', type: 'text', order: 4 },
    { name: 'CountryOfOrigin', fieldname: 'countryoforigin', type: 'text', order: 5 },
    { name: 'LocationOfCertificate', fieldname: 'locationofcertificate', type: 'text', order: 6 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): BirthCertificate {
    return new BirthCertificate();
  }
}
