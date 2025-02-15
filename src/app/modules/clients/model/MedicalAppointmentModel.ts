import { MlcModel } from './common/mlc.model';

export class MedicalAppointment implements MlcModel {
  name: string;
  appointmentdate: string;
  healthprovidername: string;
  healthprovidelocation: string;
  result: string;
  furtherinstructions: string;
  notes: string;
}
