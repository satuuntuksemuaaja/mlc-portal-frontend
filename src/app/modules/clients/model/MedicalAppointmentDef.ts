import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { MedicalAppointment } from '../model/MedicalAppointmentModel';

export class MedicalAppointmentDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'apt'];

  public readonly identifier: string = 'MedicalAppointment';

  // Item Name
  public readonly name: string = 'Medical appointment';

  public readonly label: string = 'medicalappointment';

  public readonly classname: any = MedicalAppointment;

  public readonly classifications: string[] = MedicalAppointmentDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'AppointmentDate', fieldname: 'appointmentdate', type: 'datetime', order: 2 },
    { name: 'HealthProviderName', fieldname: 'healthprovidername', type: 'text', order: 3 },
    { name: 'HealthProvideLocation', fieldname: 'healthprovidelocation', type: 'text', order: 4 },
    { name: 'Result', fieldname: 'result', type: 'text', order: 5 },
    { name: 'FurtherInstructions', fieldname: 'furtherinstructions', type: 'longtext', order: 6 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): MedicalAppointment {
    return new MedicalAppointment();
  }
}
