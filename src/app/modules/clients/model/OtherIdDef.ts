import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { OtherId } from '../model/OtherIdModel';

export class OtherIdDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'id', 'oid'];

  public readonly identifier: string = 'OtherId';

  // Item Name
  public readonly name: string = 'Other ID';

  public readonly label: string = 'otherid';

  public readonly classname: any = OtherId;

  public readonly classifications: string[] = OtherIdDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Fullname', fieldname: 'fullname', type: 'text', order: 2 },
    { name: 'Number', fieldname: 'number', type: 'text', order: 3 },
    { name: 'OriginOfIssue', fieldname: 'originofissue', type: 'text', order: 4 },
    { name: 'DateOfIssue', fieldname: 'dateofissue', type: 'date', order: 5 },
    { name: 'ExpiryDate', fieldname: 'expirydate', type: 'date', order: 6 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): OtherId {
    return new OtherId();
  }
}
