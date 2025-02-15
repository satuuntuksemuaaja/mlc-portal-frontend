import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorMedicalId } from '../model/JuniorMedicalIdModel';

export class JuniorMedicalIdDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jmid'];

  public readonly identifier: string = 'JuniorMedicalId';

  // Item Name
  public readonly name: string = 'Junior medical ID';

  public readonly label: string = 'juniormedicalid';

  public readonly classname: any = JuniorMedicalId;

  public readonly classifications: string[] = JuniorMedicalIdDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Numbers', fieldname: 'numbers', type: 'text', order: 2 },
    { name: 'OthersListed', fieldname: 'otherslisted', type: 'text', order: 3 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorMedicalId {
    return new JuniorMedicalId();
  }
}
