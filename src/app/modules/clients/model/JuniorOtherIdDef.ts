import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorOtherId } from '../model/JuniorOtherIdModel';

export class JuniorOtherIdDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jid', 'joid'];

  public readonly identifier: string = 'JuniorOtherId';

  // Item Name
  public readonly name: string = 'Junior other ID';

  public readonly label: string = 'juniorotherid';

  public readonly classname: any = JuniorOtherId;

  public readonly classifications: string[] = JuniorOtherIdDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Fullname', fieldname: 'fullname', type: 'text', order: 2 },
    { name: 'Number', fieldname: 'number', type: 'text', order: 3 },
    { name: 'OriginOfIssue', fieldname: 'originofissue', type: 'text', order: 4 },
    { name: 'DateOfIssue', fieldname: 'dateofissue', type: 'date', order: 5 },
    { name: 'ExpiryDate', fieldname: 'expirydate', type: 'date', order: 6 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorOtherId {
    return new JuniorOtherId();
  }
}
