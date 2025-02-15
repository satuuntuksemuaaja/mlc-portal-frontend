import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorPrescription } from '../model/JuniorPrescriptionModel';

export class JuniorPrescriptionDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jpre'];

  public readonly identifier: string = 'JuniorPrescription';

  // Item Name
  public readonly name: string = 'Junior prescription';

  public readonly label: string = 'juniorprescription';

  public readonly classname: any = JuniorPrescription;

  public readonly classifications: string[] = JuniorPrescriptionDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Type', fieldname: 'type', type: 'text', order: 2 },
    { name: 'PrescribedBy', fieldname: 'prescribedby', type: 'text', order: 3 },
    { name: 'DateOfPrescription', fieldname: 'dateofprescription', type: 'date', order: 4 },
    { name: 'PrescriptionExpiryDate', fieldname: 'prescriptionexpirydate', type: 'date', order: 5 },
    { name: 'NumberOfRepeats', fieldname: 'numberofrepeats', type: 'text', order: 6 },
    { name: 'Dose', fieldname: 'dose', type: 'text', order: 7 },
    { name: 'Frequency', fieldname: 'frequency', type: 'text', order: 8 },
    { name: 'AdditionalInstructions', fieldname: 'additionalinstructions', type: 'text', order: 9 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorPrescription {
    return new JuniorPrescription();
  }
}
