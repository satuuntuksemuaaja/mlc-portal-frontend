import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { DriversLicence } from '../model/DriversLicenceModel';

export class DriversLicenceDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'id', 'drl'];

  public readonly identifier: string = 'DriversLicence';

  // Item Name
  public readonly name: string = 'Drivers licence';

  public readonly label: string = 'driverslicence';

  public readonly classname: any = DriversLicence;

  public readonly classifications: string[] = DriversLicenceDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Number', fieldname: 'number', type: 'text', order: 2 },
    { name: 'StateOfOrigin', fieldname: 'stateoforigin', type: 'text', order: 3 },
    { name: 'ExpiryDate', fieldname: 'expirydate', type: 'date', order: 4 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): DriversLicence {
    return new DriversLicence();
  }
}
