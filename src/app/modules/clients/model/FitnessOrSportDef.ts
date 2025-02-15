import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { FitnessOrSport } from '../model/FitnessOrSportModel';

export class FitnessOrSportDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'hw', 'fit'];

  public readonly identifier: string = 'FitnessOrSport';

  // Item Name
  public readonly name: string = 'Fitness or sport';

  public readonly label: string = 'fitnessorsport';

  public readonly classname: any = FitnessOrSport;

  public readonly classifications: string[] = FitnessOrSportDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'ClubOrOrganisationName', fieldname: 'clubororganisationname', type: 'text', order: 2 },
    { name: 'LocationOrAddress', fieldname: 'locationoraddress', type: 'text', order: 3 },
    { name: 'AdditionalInformation', fieldname: 'additionalinformation', type: 'text', order: 4 },
    { name: 'LevelOrGroupName', fieldname: 'levelorgroupname', type: 'text', order: 5 },
    {
      name: 'ResultsOrAwardsReceived',
      fieldname: 'resultsorawardsreceived',
      type: 'text',
      order: 6
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): FitnessOrSport {
    return new FitnessOrSport();
  }
}
