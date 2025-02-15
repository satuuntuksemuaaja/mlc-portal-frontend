import { MlcModel } from './common/mlc.model';

export class JuniorMedicalAppointment implements MlcModel {
  name: string;
  appointmentdate: string;
  healthprovidername: string;
  healthproviderlocation: string;
  result: string;
  furtherinstructions: string;
  notes: string;
}
