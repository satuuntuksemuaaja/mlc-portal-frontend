import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { Prescription } from '../model/PrescriptionModel';

export class PrescriptionDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'pre'];

  public readonly identifier: string = 'Prescription';

  // Item Name
  public readonly name: string = 'Prescription';

  public readonly label: string = 'prescription';

  public readonly classname: any = Prescription;

  public readonly classifications: string[] = PrescriptionDef.defclassifications;

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

  newModel(): Prescription {
    return new Prescription();
  }
}
