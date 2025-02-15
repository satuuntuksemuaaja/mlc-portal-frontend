import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { MedicalIDCard } from '../model/MedicalIDCardModel';

export class MedicalIDCardDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'mid'];

  public readonly identifier: string = 'MedicalIDCard';

  // Item Name
  public readonly name: string = 'Medical ID card';

  public readonly label: string = 'medicalidcard';

  public readonly classname: any = MedicalIDCard;

  public readonly classifications: string[] = MedicalIDCardDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'CardNumbers', fieldname: 'cardnumbers', type: 'text', order: 2 },
    { name: 'OthersListed', fieldname: 'otherslisted', type: 'text', order: 3 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): MedicalIDCard {
    return new MedicalIDCard();
  }
}
