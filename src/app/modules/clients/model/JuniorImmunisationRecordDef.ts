import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorImmunisationRecord } from '../model/JuniorImmunisationRecordModel';

export class JuniorImmunisationRecordDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jimr'];

  public readonly identifier: string = 'JuniorImmunisationRecord';

  // Item Name
  public readonly name: string = 'Junior immunisation record';

  public readonly label: string = 'juniorimmunisationrecord';

  public readonly classname: any = JuniorImmunisationRecord;

  public readonly classifications: string[] = JuniorImmunisationRecordDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'AdministeredBy', fieldname: 'administeredby', type: 'text', order: 2 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 3 },
    { name: 'Results', fieldname: 'results', type: 'text', order: 4 },
    { name: 'FurtherInstructions', fieldname: 'furtherinstructions', type: 'text', order: 5 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorImmunisationRecord {
    return new JuniorImmunisationRecord();
  }
}
