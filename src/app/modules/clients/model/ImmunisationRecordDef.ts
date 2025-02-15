import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { ImmunisationRecord } from '../model/ImmunisationRecordModel';

export class ImmunisationRecordDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'imr'];

  public readonly identifier: string = 'ImmunisationRecord';

  // Item Name
  public readonly name: string = 'Immunisation record';

  public readonly label: string = 'immunisationrecord';

  public readonly classname: any = ImmunisationRecord;

  public readonly classifications: string[] = ImmunisationRecordDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'AdministeredBy', fieldname: 'administeredby', type: 'text', order: 2 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 3 },
    { name: 'Results', fieldname: 'results', type: 'text', order: 4 },
    { name: 'FurtherInstructions', fieldname: 'furtherinstructions', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): ImmunisationRecord {
    return new ImmunisationRecord();
  }
}
