import { MlcField } from './common/mlc.field';
import { MlcDef } from './common/mlc.def';
import { JuniorMusic } from '../model/JuniorMusicModel';

export class JuniorMusicDef implements MlcDef {
  public static readonly defclassifications: string[] = ['jn', 'jpv', 'jac', 'jmus'];

  public readonly identifier: string = 'JuniorMusic';

  // Item Name
  public readonly name: string = 'Junior music';

  public readonly label: string = 'juniormusic';

  public readonly classname: any = JuniorMusic;

  public readonly classifications: string[] = JuniorMusicDef.defclassifications;

  public readonly fields: MlcField[] = [
    { name: 'Name', fieldname: 'name', type: 'text', order: 0 },
    { name: 'TypeOrInstrument', fieldname: 'typeorinstrument', type: 'text', order: 2 },
    { name: 'Year', fieldname: 'year', type: 'text', order: 3 },
    { name: 'GroupOrClass', fieldname: 'grouporclass', type: 'text', order: 4 },
    { name: 'Teacher', fieldname: 'teacher', type: 'text', order: 5 },
    { name: 'SpecialMemories', fieldname: 'specialmemories', type: 'text', order: 6 },
    { name: 'Notes', fieldname: 'notes', type: 'longtext', order: 100 }
  ];

  newModel(): JuniorMusic {
    return new JuniorMusic();
  }
}
