import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorPassport } from '../model/JuniorPassportModel';

export class JuniorPassportDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jid', 'jpsp'];

  public readonly identifier: string = 'JuniorPassport';

  // Item Name
  public readonly name: string = 'Junior passport';

  public readonly label: string = 'juniorpassport';

  public readonly classname: any = JuniorPassport;

  public readonly classifications: string[] = JuniorPassportDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Fullname', fieldname: 'fullname', type: 'text', order: 2 },
    { name: 'DateOfBirth', fieldname: 'dateofbirth', type: 'date', order: 3 },
    { name: 'PlaceOfBirth', fieldname: 'placeofbirth', type: 'text', order: 4 },
    { name: 'Gender', fieldname: 'gender', type: 'text', order: 5 },
    { name: 'PassportNumber', fieldname: 'passportnumber', type: 'text', order: 6 },
    { name: 'CountryOfOrigin', fieldname: 'countryoforigin', type: 'text', order: 7 },
    { name: 'DateOfIssue', fieldname: 'dateofissue', type: 'date', order: 8 },
    { name: 'ExpiryDate', fieldname: 'expirydate', type: 'date', order: 9 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorPassport {
    return new JuniorPassport();
  }
}
