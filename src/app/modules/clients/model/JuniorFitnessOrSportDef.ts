import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorFitnessOrSport } from '../model/JuniorFitnessOrSportModel';

export class JuniorFitnessOrSportDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jhw', 'jfit'];

  public readonly identifier: string = 'JuniorFitnessOrSport';

  // Item Name
  public readonly name: string = 'Junior fitness or sport';

  public readonly label: string = 'juniorfitnessorsport';

  public readonly classname: any = JuniorFitnessOrSport;

  public readonly classifications: string[] = JuniorFitnessOrSportDef.defclassifications;

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

  newModel(): JuniorFitnessOrSport {
    return new JuniorFitnessOrSport();
  }
}
