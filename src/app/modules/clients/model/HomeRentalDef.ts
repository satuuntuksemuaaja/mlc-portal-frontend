import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { HomeRental } from '../model/HomeRentalModel';

export class HomeRentalDef implements MlcDef {
  public static readonly defclassifications: string[] = ['ad', 'pv', 'fn', 'hmr'];

  public readonly identifier: string = 'HomeRental';

  // Item Name
  public readonly name: string = 'Home rental';

  public readonly label: string = 'homerental';

  public readonly classname: any = HomeRental;

  public readonly classifications: string[] = HomeRentalDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'TermOfRental', fieldname: 'termofrental', type: 'text', order: 2 },
    { name: 'RentalAgentName', fieldname: 'rentalagentname', type: 'text', order: 3 },
    {
      name: 'RentalAgentLocationOrAddress',
      fieldname: 'rentalagentlocationoraddress',
      type: 'text',
      order: 4
    },
    {
      name: 'NamesOrSignatoriesOnRental',
      fieldname: 'namesorsignatoriesonrental',
      type: 'text',
      order: 5
    },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): HomeRental {
    return new HomeRental();
  }
}
