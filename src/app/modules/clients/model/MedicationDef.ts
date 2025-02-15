import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Medication } from '../model/MedicationModel';

export class MedicationDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'med'];

  public readonly identifier: string = 'Medication';

  // Item Name
  public readonly name: string = 'Medication';

  public readonly label: string = 'medication';

  public readonly classname: any = Medication;

  public readonly classifications: string[] = MedicationDef.defclassifications;

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

  newModel(): Medication {
    return new Medication();
  }
}
