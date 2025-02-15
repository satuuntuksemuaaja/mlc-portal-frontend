import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { EducationOrQualification } from '../model/EducationOrQualificationModel';

export class EducationOrQualificationDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'ed', 'qul'];

  public readonly identifier: string = 'EducationOrQualification';

  // Item Name
  public readonly name: string = 'Education or qualification';

  public readonly label: string = 'educationorqualification';

  public readonly classname: any = EducationOrQualification;

  public readonly classifications: string[] = EducationOrQualificationDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'Institution', fieldname: 'institution', type: 'text', order: 2 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 3 },
    { name: 'DateStarted', fieldname: 'datestarted', type: 'date', order: 4 },
    {
      name: 'DateFinishedOrExpectedFinish',
      fieldname: 'datefinishedorexpectedfinish',
      type: 'date',
      order: 5
    },
    { name: 'StudentId', fieldname: 'studentid', type: 'text', order: 6 },
    { name: 'StudentAccountOrLogins', fieldname: 'studentaccountorlogins', type: 'text', order: 7 },
    { name: 'AccommodationName', fieldname: 'accommodationname', type: 'text', order: 8 },
    { name: 'AccommodationContact', fieldname: 'accommodationcontact', type: 'text', order: 9 },
    { name: 'AccommodationAddreess', fieldname: 'accommodationaddreess', type: 'text', order: 10 },
    { name: 'TransportDetails', fieldname: 'transportdetails', type: 'text', order: 11 },
    { name: 'ParkingDetails', fieldname: 'parkingdetails', type: 'text', order: 12 },
    { name: 'Results', fieldname: 'results', type: 'text', order: 13 },
    { name: 'Highlights', fieldname: 'highlights', type: 'text', order: 14 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): EducationOrQualification {
    return new EducationOrQualification();
  }
}
