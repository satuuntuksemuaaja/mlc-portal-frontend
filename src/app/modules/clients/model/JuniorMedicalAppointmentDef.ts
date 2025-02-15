import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorMedicalAppointment } from '../model/JuniorMedicalAppointmentModel';

export class JuniorMedicalAppointmentDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'japt'];

  public readonly identifier: string = 'JuniorMedicalAppointment';

  // Item Name
  public readonly name: string = 'Junior medical appointment';

  public readonly label: string = 'juniormedicalappointment';

  public readonly classname: any = JuniorMedicalAppointment;

  public readonly classifications: string[] = JuniorMedicalAppointmentDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'AppointmentDate', fieldname: 'appointmentdate', type: 'datetime', order: 2 },
    { name: 'HealthProviderName', fieldname: 'healthprovidername', type: 'text', order: 3 },
    { name: 'HealthProviderLocation', fieldname: 'healthproviderlocation', type: 'text', order: 4 },
    { name: 'Result', fieldname: 'result', type: 'text', order: 5 },
    { name: 'FurtherInstructions', fieldname: 'furtherinstructions', type: 'longtext', order: 6 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorMedicalAppointment {
    return new JuniorMedicalAppointment();
  }
}
