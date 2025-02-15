import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { PensionOrBenefitName } from '../model/PensionOrBenefitNameModel';

export class PensionOrBenefitNameDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'ben'];

  public readonly identifier: string = 'PensionOrBenefitName';

  // Item Name
  public readonly name: string = 'Pension or benefit name';

  public readonly label: string = 'pensionorbenefitname';

  public readonly classname: any = PensionOrBenefitName;

  public readonly classifications: string[] = PensionOrBenefitNameDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'PensionOrBenefitNumber', fieldname: 'pensionorbenefitnumber', type: 'text', order: 2 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): PensionOrBenefitName {
    return new PensionOrBenefitName();
  }
}
