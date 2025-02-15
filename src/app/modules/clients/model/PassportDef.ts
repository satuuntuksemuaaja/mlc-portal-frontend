import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Passport } from '../model/PassportModel';

export class PassportDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'id', 'psp'];

  public readonly identifier: string = 'Passport';

  // Item Name
  public readonly name: string = 'Passport';

  public readonly label: string = 'passport';

  public readonly classname: any = Passport;

  public readonly classifications: string[] = PassportDef.defclassifications;

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

  newModel(): Passport {
    return new Passport();
  }
}
