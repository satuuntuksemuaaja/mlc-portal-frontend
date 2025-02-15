import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { CareerOrWork } from '../model/CareerOrWorkModel';

export class CareerOrWorkDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'ed', 'car'];

  public readonly identifier: string = 'CareerOrWork';

  // Item Name
  public readonly name: string = 'Career or work';

  public readonly label: string = 'careerorwork';

  public readonly classname: any = CareerOrWork;

  public readonly classifications: string[] = CareerOrWorkDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'JobTitle', fieldname: 'jobtitle', type: 'text', order: 2 },
    { name: 'JobDescription', fieldname: 'jobdescription', type: 'text', order: 3 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 4 },
    { name: 'InterviewDate', fieldname: 'interviewdate', type: 'date', order: 5 },
    { name: 'InterviewerNames', fieldname: 'interviewernames', type: 'text', order: 6 },
    { name: 'DateOfOffer', fieldname: 'dateofoffer', type: 'date', order: 7 },
    { name: 'DateOfAcceptance', fieldname: 'dateofacceptance', type: 'date', order: 8 },
    { name: 'EmployeeId', fieldname: 'employeeid', type: 'text', order: 9 },
    {
      name: 'EmployeeAccountOrLogin',
      fieldname: 'employeeaccountorlogin',
      type: 'text',
      order: 10
    },
    { name: 'DateStarted', fieldname: 'datestarted', type: 'date', order: 11 },
    {
      name: 'DateFinishedOrExpectedFinish',
      fieldname: 'datefinishedorexpectedfinish',
      type: 'date',
      order: 12
    },
    { name: 'Highlights', fieldname: 'highlights', type: 'text', order: 13 },
    { name: 'Learnings', fieldname: 'learnings', type: 'text', order: 14 },
    { name: 'Experiences', fieldname: 'experiences', type: 'text', order: 15 },
    {
      name: 'CoursesAndCertifications',
      fieldname: 'coursesandcertifications',
      type: 'text',
      order: 16
    },
    { name: 'Awards', fieldname: 'awards', type: 'text', order: 17 },
    { name: 'ParkingDetails', fieldname: 'parkingdetails', type: 'text', order: 18 },
    { name: 'AccommodationName', fieldname: 'accommodationname', type: 'text', order: 19 },
    { name: 'AccommodationAddress', fieldname: 'accommodationaddress', type: 'text', order: 20 },
    { name: 'TravelDetails', fieldname: 'traveldetails', type: 'text', order: 21 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): CareerOrWork {
    return new CareerOrWork();
  }
}
