import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { MedicalConditions } from '../model/MedicalConditionsModel';

export class MedicalConditionsDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'mcd'];

  public readonly identifier: string = 'MedicalConditions';

  // Item Name
  public readonly name: string = 'Medical conditions';

  public readonly label: string = 'medicalconditions';

  public readonly classname: any = MedicalConditions;

  public readonly classifications: string[] = MedicalConditionsDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'NameOfMedication', fieldname: 'nameofmedication', type: 'text', order: 2 },
    { name: 'Type', fieldname: 'type', type: 'text', order: 3 },
    { name: 'PrescribedBy', fieldname: 'prescribedby', type: 'text', order: 4 },
    { name: 'DateOfPrescription', fieldname: 'dateofprescription', type: 'date', order: 5 },
    { name: 'PrescriptionExpiryDate', fieldname: 'prescriptionexpirydate', type: 'date', order: 6 },
    { name: 'NumberOfRepeats', fieldname: 'numberofrepeats', type: 'text', order: 7 },
    { name: 'Dose', fieldname: 'dose', type: 'text', order: 8 },
    { name: 'Frequency', fieldname: 'frequency', type: 'text', order: 9 },
    {
      name: 'AdditionalInstructions',
      fieldname: 'additionalinstructions',
      type: 'text',
      order: 10
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): MedicalConditions {
    return new MedicalConditions();
  }
}
