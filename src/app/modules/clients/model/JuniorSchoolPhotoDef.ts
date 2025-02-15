import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorSchoolPhoto } from '../model/JuniorSchoolPhotoModel';

export class JuniorSchoolPhotoDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jed', 'jsph'];

  public readonly identifier: string = 'JuniorSchoolPhoto';

  // Item Name
  public readonly name: string = 'Junior school photo';

  public readonly label: string = 'juniorschoolphoto';

  public readonly classname: any = JuniorSchoolPhoto;

  public readonly classifications: string[] = JuniorSchoolPhotoDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'School', fieldname: 'school', type: 'text', order: 2 },
    { name: 'Year', fieldname: 'year', type: 'text', order: 3 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorSchoolPhoto {
    return new JuniorSchoolPhoto();
  }
}
