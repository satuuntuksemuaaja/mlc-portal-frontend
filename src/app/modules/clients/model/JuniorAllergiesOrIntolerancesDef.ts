import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorAllergiesOrIntolerances } from '../model/JuniorAllergiesOrIntolerancesModel';

export class JuniorAllergiesOrIntolerancesDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jalg'];

  public readonly identifier: string = 'JuniorAllergiesOrIntolerances';

  // Item Name
  public readonly name: string = 'Junior allergies or intolerances';

  public readonly label: string = 'juniorallergiesorintolerances';

  public readonly classname: any = JuniorAllergiesOrIntolerances;

  public readonly classifications: string[] = JuniorAllergiesOrIntolerancesDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'EffectOfAllergy', fieldname: 'effectofallergy', type: 'text', order: 2 },
    {
      name: 'NameOfMedicationOrTreatment',
      fieldname: 'nameofmedicationortreatment',
      type: 'text',
      order: 3
    },
    {
      name: 'TypeOfMedicationOrTreatment',
      fieldname: 'typeofmedicationortreatment',
      type: 'text',
      order: 4
    },
    { name: 'PrescribedBy', fieldname: 'prescribedby', type: 'text', order: 5 },
    { name: 'DateOfPrescription', fieldname: 'dateofprescription', type: 'date', order: 6 },
    { name: 'PrescriptionExpiryDate', fieldname: 'prescriptionexpirydate', type: 'date', order: 7 },
    { name: 'NumberOfRepeats', fieldname: 'numberofrepeats', type: 'text', order: 8 },
    { name: 'Dose', fieldname: 'dose', type: 'text', order: 9 },
    { name: 'Frequency', fieldname: 'frequency', type: 'text', order: 10 },
    {
      name: 'AdditionalInstructions',
      fieldname: 'additionalinstructions',
      type: 'text',
      order: 11
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorAllergiesOrIntolerances {
    return new JuniorAllergiesOrIntolerances();
  }
}
